import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { TextStyle, View } from "react-native";
import ZnsText from "./Text";

type Props = {
  text: string;
  icon?: React.ReactNode;
  textStyle?: TextStyle;
  type?: "regular" | "medium" | "semiBold" | "bold";
};

const GRADIENT_COLORS = ["#C5A70B", "#ADF25C"] as const;

export default function GradientText({
  text,
  textStyle,
  icon,
  type = "regular",
}: Props) {
  const maskElement = useMemo(
    () => (
      <View style={{ flexDirection: "row", gap: 4 }}>
        {icon}
        <ZnsText type={type} style={[textStyle, { margin: "auto" }]}>
          {text}
        </ZnsText>
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
