import { LinearGradient } from "expo-linear-gradient";
import { StyleProp, ViewStyle } from "react-native";
interface GradientBorderViewWrapperProps {
  children: React.ReactNode;
  borderRadius?: number;
  borderWidth?: number;
  gradientColors?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
}

export default function GradientBorderViewWrapper({
  children,
  borderRadius = 12,
  borderWidth = 1,
  gradientColors = ["#BB981C", "#ADDF7C"] as const,
  style,
}: GradientBorderViewWrapperProps) {
  return (
    <LinearGradient
      colors={gradientColors} // customize your gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          borderRadius,
          padding: borderWidth,
          paddingBottom: borderWidth * 1.2,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}
