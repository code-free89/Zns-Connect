import { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import Button from "@/components/ui/Button";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, NETWORK_TYPE, NETWORKS } from "@/constants/web3/chains";
import { updateHIP } from "@/lib/api/hip";
import { useAppDispatch, useAppSelector } from "@/store";
import { setHIPData } from "@/store/slices/hip";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const REFERRAL_POINTS = 10;

function ReferralCard({
  chain,
  referralCount,
  onCopy,
}: {
  chain: NETWORK_TYPE;
  referralCount: number;
  onCopy: () => void;
}) {
  return (
    <View style={styles.referralCard}>
      <Image source={chain.icon} style={styles.chainIcon} />
      <View style={{ flex: 1, marginLeft: getWidthSize(10) }}>
        <Text style={styles.cardValue}>{referralCount}</Text>
        <Text style={styles.cardDescription}>on {chain.shortName}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardValue}>{referralCount * REFERRAL_POINTS}</Text>
        <Text style={styles.cardDescription}>point</Text>
      </View>

      <Button style={styles.copyButton} onPress={onCopy}>
        <Text style={styles.copyButtonText}>Copy Link</Text>
        <MaterialCommunityIcons
          name="link-variant"
          size={getWidthSize(11)}
          color={CustomDarkTheme.colors.primary}
        />
      </Button>
    </View>
  );
}

export default function ReferralsTab() {
  const dispatch = useAppDispatch();
  const hipData = useAppSelector((state) => state.hip);
  const { user } = useAppSelector((state) => state.user);
  const { referrals_lead } = useAppSelector((state) => state.referral);
  const { address, chainId } = useAccount();
  const [totalXP, setTotalXP] = useState<number>(0);

  const myReferrals = useMemo(() => {
    const filteredData = referrals_lead.filter(
      (item) => item.walletAddress === address
    );

    return filteredData;
  }, [referrals_lead]);

  const selfIndex = useMemo(
    () => myReferrals.findIndex((item) => item.walletAddress === address),
    [myReferrals, address]
  );

  const referUrl = useMemo(
    () =>
      user && user.referralCode
        ? `${process.env.EXPO_PUBLIC_APP_URL}?ref=${user.referralCode}`
        : `${process.env.EXPO_PUBLIC_APP_URL}`,
    [user]
  );

  const onCopy = () => {
    if (user) {
      copyToClipboard(referUrl);
      showSuccessToast("Copied to clipboard");
    }
  };

  useEffect(() => {
    if (
      myReferrals.length > 0 &&
      hipData.id &&
      chainId === NETWORKS.INKMAINNET
    ) {
      const totalPoints = myReferrals.reduce((acc, curr) => {
        return acc + curr.numberOfReferrals * 10;
      }, 0);
      setTotalXP(totalPoints);

      const updateData = async () => {
        try {
          await updateHIP(hipData.id, {
            totalEarnings: myReferrals[selfIndex]?.totalEarnings,
            referralPoints: totalPoints,
          });
          dispatch(
            setHIPData({
              referralPoints: totalPoints,
              totalEarnings: myReferrals[selfIndex]?.totalEarnings,
              totalPoints:
                hipData.totalPoints - hipData.referralPoints + totalPoints,
            })
          );
        } catch (error) {
          console.error("Failed to update HIP referrals:", error);
        }
      };

      updateData();
    }
  }, [hipData.id, myReferrals, selfIndex]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Earn {REFERRAL_POINTS} XP Points for Every Referral Across Any Chain!
          Use your single universal referral link to invite users across all
          chains.
        </Text>
      </View>

      {CHAINS.filter((chain) => !chain.testnet).map((chain) => {
        const chainReferrals = myReferrals.find(
          (ref) => ref.chain === chain.chain
        );
        const referralCount = chainReferrals?.numberOfReferrals || 0;

        return (
          <ReferralCard
            key={chain.chain}
            chain={chain}
            referralCount={referralCount}
            onCopy={onCopy}
          />
        );
      })}

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
        borderRadius={getWidthSize(16)}
        style={{ marginTop: getHeightSize(6) }}
      >
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPoints}>{totalXP} XP</Text>
          <Text style={styles.totalText}> points</Text>
        </View>
      </GradientBorderViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: getWidthSize(10),
    borderRadius: getWidthSize(18),
    borderWidth: 1,
    borderColor: "#454545",
    gap: getHeightSize(10),
  },
  alertContainer: {
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    borderRadius: getWidthSize(16),
    flexDirection: "row",
    gap: getWidthSize(12),
  },
  alertText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  totalContent: {
    borderRadius: getWidthSize(16),
    paddingVertical: getHeightSize(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0EB9",
  },
  totalText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: "white",
  },
  totalPoints: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: "white",
  },
  referralCard: {
    paddingHorizontal: getWidthSize(8),
    paddingVertical: getHeightSize(10),
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    flexDirection: "row",
    alignItems: "center",
  },
  chainIcon: {
    width: getWidthSize(25),
    height: getWidthSize(25),
    borderRadius: 9999,
  },
  cardValue: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: "white",
  },
  cardDescription: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  copyButton: {
    width: "auto",
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(12),
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    gap: getWidthSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  copyButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: CustomDarkTheme.colors.primary,
  },
});
