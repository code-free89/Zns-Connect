import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";

const REFERRAL_POINTS = 50;

export default function NFTTab() {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Mint a domain on any chain from the list and earn {REFERRAL_POINTS} XP
          points for each minting.
        </Text>
      </View>

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
        borderRadius={getWidthSize(16)}
        style={{ marginTop: getHeightSize(6) }}
      >
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPoints}>0</Text>
          <Text style={styles.totalText}> of 300 XP</Text>
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
});
