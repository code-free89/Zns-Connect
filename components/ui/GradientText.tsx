import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text, TextStyle } from "react-native";

type Props = {
  text: string;
  textStyle?: TextStyle;
};

const GRADIENT_COLORS = ["#C5A70B", "#ADF25C"] as const;

export default function GradientText({ text, textStyle }: Props) {
  const maskElement = useMemo(
    () => <Text style={[textStyle, { margin: "auto" }]}>{text}</Text>,
    [text, textStyle]
  );

  return (
    <MaskedView
      style={{
        width: "100%",
        height: "100%",
      }}
      maskElement={maskElement}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </MaskedView>
  );
}
