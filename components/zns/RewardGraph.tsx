import { StyleSheet, Text, View } from "react-native";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { RewardInfo } from "@/constants/profile";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { LinearGradient } from "expo-linear-gradient";

const GRADIENT_COLORS = CustomDarkTheme.gradientColors.linear1;
const REFERRAL_OPTIONS = [
  { referral: 1, reward: 5 },
  { referral: 10, reward: 10 },
  { referral: 30, reward: 15 },
  { referral: 60, reward: 20 },
  { referral: 100, reward: 25 },
];

type RewardGraphProps = {
  totalReferrals: number;
  currentLevel: RewardInfo;
  nextLevel: RewardInfo;
};

export default function RewardGraph({
  totalReferrals,
  currentLevel,
  nextLevel,
}: RewardGraphProps) {
  return (
    <GradientBorderViewWrapper
      gradientColors={CustomDarkTheme.gradientColors.linear1}
      borderRadius={getWidthSize(16)}
      style={{ marginTop: getHeightSize(24) }}
    >
      <View style={styles.container}>
        <View style={styles.currentRewardLevelContainer}>
          <View>
            <Text style={styles.currentReferralScoreValue}>
              {totalReferrals}
              <Text style={{ ...fontStyles["Poppins-Regular"] }}>
                /{nextLevel.refer}
              </Text>
            </Text>
            <Text style={styles.currentReferralScoreLabel}>
              Current Referral Score
            </Text>
          </View>

          <GradientBorderViewWrapper
            gradientColors={CustomDarkTheme.gradientColors.linear2}
            borderRadius={getWidthSize(24)}
          >
            <View style={styles.currentLevelContainer}>
              <Text style={styles.currentRewardPercentValue}>
                {currentLevel.reward}%
              </Text>
              <Text style={styles.currentRewardPercentLabel}>Rewards</Text>
            </View>
          </GradientBorderViewWrapper>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg} />
            <View style={styles.progressBarThumbContainer}>
              {GRADIENT_COLORS.map((color: string, index: number) => (
                <View
                  key={color}
                  style={[
                    styles.progressBarThumb,
                    {
                      borderColor: GRADIENT_COLORS[index],
                      backgroundColor:
                        index < currentLevel.level ? "white" : "black",
                    },
                  ]}
                ></View>
              ))}
            </View>
            <View
              style={{
                position: "absolute",
                width: "100%",
                height: `${
                  Math.max(currentLevel.level - 1, 0) * 25 +
                  (Math.max(totalReferrals - currentLevel.refer, 0) /
                    (nextLevel.refer - currentLevel.refer)) *
                    25
                }%`,
                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={{ width: 3, height: 140 }}
              />
            </View>
          </View>

          <View style={styles.referralOptionsContainer}>
            {REFERRAL_OPTIONS.map((option) => (
              <Text key={option.referral} style={styles.referralOptionText}>
                {option.referral} referral{"   "}
                <Text style={styles.referralRewardText}>
                  {option.reward}% reward
                </Text>
              </Text>
            ))}
          </View>
        </View>
      </View>
    </GradientBorderViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: getWidthSize(30),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(16),
  },
  currentRewardLevelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentReferralScoreValue: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(18),
    lineHeight: getHeightSize(18) * 1.35,
    color: "white",
  },
  currentReferralScoreLabel: {
    marginTop: getHeightSize(8),
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  currentLevelContainer: {
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(6),
    borderRadius: getWidthSize(24),
    backgroundColor: CustomDarkTheme.colors.grey2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: getWidthSize(8),
  },
  currentRewardPercentValue: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 1.35,
    color: "white",
  },
  currentRewardPercentLabel: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  progressSection: {
    marginTop: getHeightSize(24),
    flexDirection: "row",
  },
  progressBarContainer: {
    width: 3,
    height: 140,
  },
  progressBarBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#363940",
  },
  progressBarThumbContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    zIndex: 10,
  },
  progressBarThumb: {
    borderWidth: 2,
    borderRadius: 9999,
    width: 11,
    height: 11,
    backgroundColor: "black",
    marginLeft: -4,
  },
  referralOptionsContainer: {
    justifyContent: "space-between",
    marginLeft: getWidthSize(15),
    marginTop: -2,
    marginBottom: -3,
  },
  referralOptionText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(10),
    color: CustomDarkTheme.colors.body,
  },
  referralRewardText: {
    ...fontStyles["Poppins-Medium"],
    color: "white",
  },
});
