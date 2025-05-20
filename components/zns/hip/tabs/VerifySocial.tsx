import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

const REFERRAL_POINTS = 50;

export default function VerifySocialTab() {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Earn {REFERRAL_POINTS} XP Points for Each Connected Social Account!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: getWidthSize(10),
    borderRadius: getWidthSize(18),
    borderWidth: 1,
    borderColor: "#454545",
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
});
