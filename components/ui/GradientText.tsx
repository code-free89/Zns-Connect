import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Text, TextStyle, View } from "react-native";

type Props = {
  text: string;
  icon?: React.ReactNode;
  textStyle?: TextStyle;
};

const GRADIENT_COLORS = ["#C5A70B", "#ADF25C"] as const;

export default function GradientText({ text, textStyle, icon }: Props) {
  const maskElement = useMemo(
    () => (
      <View style={{ flexDirection: "row", gap: 4 }}>
        {icon}
        <Text style={[textStyle, { margin: "auto", paddingInline: 4 }]}>
          {text}
        </Text>
      </View>
    ),
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
