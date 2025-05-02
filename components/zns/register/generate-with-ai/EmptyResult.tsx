import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";

export default function EmptyResult() {
  return (
    <View style={styles.container}>
      <Text style={[fontStyles["Poppins-SemiBold"], styles.title]}>
        Results appear here
      </Text>
      <Text style={[fontStyles["Poppins-Regular"], styles.subtitle]}>
        Please generate domains using AI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.body,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
  },
});
