import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";

export default function EmptyResult() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results appear here</Text>
      <Text style={styles.subtitle}>Please generate domains using AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: getHeightSize(40),
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    color: CustomDarkTheme.colors.body,
  },
  subtitle: {
    marginTop: getHeightSize(8),
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.body,
  },
});
