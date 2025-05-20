import { StyleSheet, Text, View } from "react-native";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { FaceRecognitionIcon, WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import Button from "@/components/ui/Button";

const REFERRAL_POINTS = 200;

export default function RecognitionTab() {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Complete facial verification and earn {REFERRAL_POINTS} XP points.
        </Text>
      </View>

      <View style={styles.verificationContainer}>
        <View style={styles.faceRecognitionContainer}>
          <FaceRecognitionIcon />
        </View>
        <Text style={styles.faceRecognitionText}>Facial connection</Text>

        <Button
          style={styles.selfieButton}
          title="Take selfie (Soon)"
          textStyle={styles.selfieButtonText}
        />
      </View>

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
        borderRadius={getWidthSize(16)}
        style={{ marginTop: getHeightSize(6) }}
      >
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPoints}>0 XP</Text>
          <Text style={styles.totalText}> of {REFERRAL_POINTS} XP</Text>
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
  verificationContainer: {
    padding: getWidthSize(24),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(16),
    alignItems: "center",
  },
  faceRecognitionContainer: {
    width: getWidthSize(130),
    height: getWidthSize(130),
    borderRadius: 9999,
    overflow: "hidden",
  },
  faceRecognitionText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.35,
    color: CustomDarkTheme.colors.body,
    marginTop: getHeightSize(12),
    marginBottom: getHeightSize(24),
  },
  selfieButton: {
    paddingVertical: getHeightSize(12),
    borderRadius: getWidthSize(16),
    backgroundColor: "#CAFC011A",
  },
  selfieButtonText: {
    color: CustomDarkTheme.colors.primary,
  },
});
