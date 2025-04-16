import { Text, TextProps, StyleSheet } from "react-native";

interface ZnxTextProps extends TextProps {
  type?: "regular" | "medium" | "semiBold" | "bold";
}

export default function ZnxText({
  children,
  style,
  type = "regular",
  ...props
}: ZnxTextProps) {
  return (
    <Text style={[style, styles[type]]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: "Poppins",
  },
  medium: {
    fontFamily: "Poppins-Medium",
  },
  semiBold: {
    fontFamily: "Poppins-SemiBold",
  },
  bold: {
    fontFamily: "Poppins-Bold",
  },
});
