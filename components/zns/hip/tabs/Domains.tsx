import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import Button from "@/components/ui/Button";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, NETWORK_TYPE } from "@/constants/web3/chains";
import { updateHIP } from "@/lib/api/hip";
import { useAppDispatch, useAppSelector } from "@/store";
import { setHIPData } from "@/store/slices/hip";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

const REFERRAL_POINTS = 20;

function DomainCard({
  chain,
  chainStats,
  isMinted,
}: {
  chain: NETWORK_TYPE;
  chainStats?: { minted: boolean; count: number };
  isMinted?: boolean;
}) {
  const handleMint = () => {
    router.push(`/(tabs)/register`);
  };

  return (
    <View style={styles.domainCard}>
      <Image source={chain.icon} style={styles.chainIcon} />
      <View style={{ flex: 1, marginLeft: getWidthSize(10) }}>
        <Text style={styles.cardValue}>{chainStats?.count || 0}</Text>
        <Text style={styles.cardDescription}>on {chain.shortName}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.cardValue}>
          {isMinted ? (chainStats?.count || 0) * REFERRAL_POINTS : 0}
        </Text>
        <Text style={styles.cardDescription}>point</Text>
      </View>

      <Button
        disabled={isMinted}
        style={[styles.mintButton, isMinted && styles.mintedButton]}
        onPress={handleMint}
      >
        {isMinted ? (
          <Text style={styles.mintedButtonText}>Minted</Text>
        ) : (
          <Text style={styles.mintButtonText}>Mint</Text>
        )}
        {isMinted && (
          <FontAwesome5 name="check-circle" size={13} color="#A3A3A3" />
        )}
      </Button>
    </View>
  );
}

export default function DomainsTab() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const hipData = useAppSelector((state) => state.hip);
  const { domains } = useAppSelector((state) => state.userDomains);
  const [totalXP, setTotalXP] = useState<number>(0);

  const mintedDomainsByChain = domains?.reduce(
    (acc: Record<number, { minted: boolean; count: number }>, domain) => {
      const chain = CHAINS.find((c) => c.id === domain.chainId);
      if (chain && !chain.testnet) {
        if (!acc[domain.chainId]) {
          acc[domain.chainId] = { minted: true, count: 1 };
        } else {
          acc[domain.chainId].count++;
        }
      }
      return acc;
    },
    {}
  );

  useEffect(() => {
    if (Object.keys(mintedDomainsByChain ?? {}).length > 0 && hipData.id) {
      const totalPoints = Object.values(mintedDomainsByChain ?? {}).reduce(
        (acc, curr) => {
          return acc + curr.count * REFERRAL_POINTS;
        },
        0
      );
      setTotalXP(totalPoints);
      const updateData = async () => {
        try {
          await updateHIP(hipData.id, {
            domainPoints: totalPoints,
          });
          dispatch(
            setHIPData({
              domainPoints: totalPoints,
              totalPoints:
                hipData.totalPoints - hipData.domainPoints + totalPoints,
            })
          );
        } catch (error) {
          console.error("Failed to update HIP domains:", error);
        }
      };
      updateData();
    }
  }, [mintedDomainsByChain]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Mint a domain on any chain from the list and earn {REFERRAL_POINTS} XP
          points for each minting.
        </Text>
      </View>

      {CHAINS.filter((chain) => !chain.testnet).map((chain) => {
        const chainStats = mintedDomainsByChain?.[chain.id];
        const isMinted = chainStats?.minted;

        return (
          <DomainCard
            key={chain.chain}
            chain={chain}
            chainStats={chainStats}
            isMinted={isMinted}
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
          <Text style={styles.totalPoints}>{totalXP}</Text>
          <Text style={styles.totalText}> XP</Text>
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
    flex: 1,
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
  domainCard: {
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
  mintButton: {
    width: getWidthSize(96),
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(12),
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    gap: getWidthSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mintedButton: {
    backgroundColor: "#292925CC",
  },
  mintButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: CustomDarkTheme.colors.primary,
  },
  mintedButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: "#A3A3A3",
  },
});
