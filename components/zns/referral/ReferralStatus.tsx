import { useMemo, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import DummyText from "@/components/ui/DummyText";
import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CopyIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";
import { LinearGradient } from "expo-linear-gradient";

export default function ReferralStatus() {
  const { user } = useAppSelector((state) => state.user);
  const { totalEarnings, numberOfReferrals } = useAppSelector(
    (state) => state.referral
  );
  const [symbolSize, setSymbolSize] = useState({ width: 0, height: 0 });
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

  const onShare = () => {
    let description =
      "🟢 Big news for @znsconnect!\n" +
      "\n" +
      "🟢 Mint your domain and enjoy up to 25%25 rewards directly in your wallet!\n" +
      "\n" +
      "Visit:";

    let url = referUrl;
    let hashtags = "zns,znsconnect";
    Linking.openURL(
      `${process.env.EXPO_PUBLIC_TWITTER_URL}/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <Text style={styles.value}>{numberOfReferrals}</Text>
          <Text style={styles.description}>Total Referrals</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={[styles.row, { alignItems: "flex-end" }]}>
            <Text style={styles.value}>
              {totalEarnings?.toLocaleString("en-US", {
                minimumFractionDigits: 5,
                maximumFractionDigits: 5,
              })}
            </Text>

            <View style={{ marginBottom: getHeightSize(4) }}>
              <DummyText
                text={`ETH`}
                textStyle={styles.valueSymbol}
                size={symbolSize}
                setSize={setSymbolSize}
              />
              <GradientText
                text="ETH"
                size={symbolSize}
                textStyle={styles.valueSymbol}
                gradientColors={CustomDarkTheme.gradientColors.linear1}
                locations={[0.0789, 0.2413, 0.4665, 0.6932, 1]}
              />
            </View>
          </View>
          <Text style={styles.description}>Total Earnings</Text>
        </View>
      </View>

      <View style={styles.referralContainer}>
        <View style={styles.row}>
          <Text style={styles.referralLinkText}>Referral Link</Text>
          <Pressable style={styles.shareContainer} onPress={onShare}>
            <Image source={require("@/assets/images/icons/share.png")} />
            <Text style={styles.shareText}>Share</Text>
          </Pressable>
        </View>

        <LinearGradient
          colors={["#CAFC01", "#CAFC0100"]}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: "100%", height: 2, marginVertical: getHeightSize(8) }}
        ></LinearGradient>

        <View style={styles.row}>
          <Text style={styles.referralLink}>{referUrl}</Text>
          <Pressable style={styles.copyContainer} onPress={onCopy}>
            <CopyIcon
              width={10}
              height={10}
              color={CustomDarkTheme.colors.p950}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getHeightSize(10),
    marginTop: getHeightSize(32),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(10),
  },
  itemContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(12),
    borderRadius: getWidthSize(16),
    flex: 1,
  },
  value: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getFontSize(24),
    color: CustomDarkTheme.colors.primary,
  },
  valueSymbol: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(10),
    lineHeight: getHeightSize(10) * 1.35,
  },
  description: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    color: "#A3A3A3",
  },
  referralContainer: {
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getWidthSize(12),
  },
  referralLinkText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(6),
    gap: getWidthSize(6),
    marginLeft: "auto",
  },
  shareText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    color: "white",
    marginTop: getHeightSize(3),
  },
  referralLink: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 2.3,
    color: "white",
  },
  copyContainer: {
    width: getWidthSize(35),
    height: getHeightSize(30),
    backgroundColor: CustomDarkTheme.colors.primary,
    borderRadius: getWidthSize(12),
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
