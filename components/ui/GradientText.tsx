import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text, TextStyle, View } from "react-native";

type Props = {
  text: string;
  icon?: React.ReactNode;
  textStyle?: TextStyle | TextStyle[];
};

const GRADIENT_COLORS = [
  "rgba(173, 223, 124, 0.88)",
  "rgba(173, 223, 124, 0.88)",
  "#BB981C",
] as const;

export default function GradientText({ text, textStyle, icon }: Props) {
  const maskElement = useMemo(
    () => (
      <View style={{ flexDirection: "row", gap: 4 }}>
        {icon}
        <Text style={textStyle}>{text}</Text>
      </View>
    ),
    [text, textStyle]
  );

  return (
    <MaskedView style={{ flex: 1 }} maskElement={maskElement}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={[0, 0.6364, 0.8189]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}
