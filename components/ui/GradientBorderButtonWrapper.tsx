import { CustomDarkTheme } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity } from "react-native";

interface GradientBorderButtonProps {
  onPress: () => void;
  children: React.ReactNode;
}

export default function GradientBorderButtonWrapper({
  onPress,
  children,
}: GradientBorderButtonProps) {
  return (
    <LinearGradient
      colors={["#BB981C", "#ADDF7C"]} // customize your gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder]}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        {children}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 12,
    padding: 0.67, // this creates the border width
  },
  button: {
    backgroundColor: CustomDarkTheme.colors.secondaryBtn, // your button background color
    borderRadius: 12, // slightly less than parent to show gradient border
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
});
