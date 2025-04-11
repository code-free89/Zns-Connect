import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet } from "react-native";

export default function SplitLine({
  direction = "horizontal",
}: {
  direction?: "horizontal" | "vertical";
}) {
  return (
    <View
      style={direction === "horizontal" ? styles.horizontal : styles.vertical}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    backgroundColor: `${CustomDarkTheme.colors.body}40`,
  },
  vertical: {
    width: 1,
    height: "50%",
    backgroundColor: `${CustomDarkTheme.colors.body}40`,
  },
});
