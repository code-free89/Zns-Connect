import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet } from "react-native";

export default function SplitLine() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: `${CustomDarkTheme.colors.body}40`,
  },
});
