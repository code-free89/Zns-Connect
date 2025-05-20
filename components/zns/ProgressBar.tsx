import { View, StyleSheet } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";

type ProgressBarProps = {
  totalPoints: number;
  maxPoints: number;
  progressWidth: number;
};

export default function ProgressBar({
  totalPoints,
  maxPoints,
  progressWidth,
}: ProgressBarProps) {
  return (
    <View>
      <LinearGradient
        colors={CustomDarkTheme.gradientColors.linear1}
        style={styles.scoreBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
      <View
        style={[
          styles.scoreThumb,
          {
            left: (totalPoints / maxPoints) * progressWidth,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scoreBar: {
    width: "100%",
    height: 10,
    borderRadius: 16,
  },
  scoreThumb: {
    width: 16,
    height: 16,
    position: "absolute",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#AD00FE",
    borderRadius: 9999,
    top: -3,
  },
});
