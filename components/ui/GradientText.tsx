import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

type Props = {
  text: string;
  icon?: React.ReactNode;
  textStyle?: TextStyle | TextStyle[];
  size?: { width: number; height: number };
  containerStyle?: ViewStyle;
  gradientColors?: readonly [string, string, ...string[]];
};

const GRADIENT_COLORS = [
  "rgba(173, 223, 124, 0.88)",
  "rgba(173, 223, 124, 0.88)",
  "#BB981C",
] as const;

export default function GradientText({
  text,
  textStyle,
  icon,
  size,
  containerStyle,
  gradientColors = GRADIENT_COLORS,
}: Props) {
  const maskElement = useMemo(
    () => (
      <View
        style={[
          containerStyle,
          { flexDirection: "row", gap: 4, alignItems: "center" },
        ]}
      >
        {icon}
        <Text style={textStyle}>{text}</Text>
      </View>
    ),
    [text, textStyle]
  );

  return (
    <MaskedView
      style={{ width: size?.width ?? 0, height: size?.height ?? 0 }}
      maskElement={maskElement}
    >
      <LinearGradient
        colors={gradientColors}
        locations={[0, 0.6364, 0.8189]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}
