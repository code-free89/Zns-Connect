import { Text, TextProps, StyleSheet } from "react-native";

interface ZnsTextProps extends TextProps {
  type?: "regular" | "medium" | "semiBold" | "bold";
}

export default function ZnsText({
  children,
  style,
  type = "regular",
  ...props
}: ZnsTextProps) {
  return (
    <Text style={[style, styles[type]]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  medium: {
    lineHeight: 24,
    fontFamily: "Poppins-Medium",
  },
  semiBold: {
    fontFamily: "Poppins-SemiBold",
  },
  bold: {
    lineHeight: 24,
    fontFamily: "Poppins-Bold",
  },
});
