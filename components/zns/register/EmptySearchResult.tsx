import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function EmptySearchResult() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results appear here</Text>
      <Text style={styles.description}>
        {"Search your domains, mint and set\nup your decentralized profile"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginVertical: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
