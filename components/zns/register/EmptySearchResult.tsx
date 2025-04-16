import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import ZnxText from "@/components/ui/Text";

export default function EmptySearchResult() {
  return (
    <View style={styles.container}>
      <ZnxText type="semiBold" style={styles.title}>
        Search Results appear here
      </ZnxText>
      <ZnxText type="regular" style={styles.description}>
        {"Search your domains, mint and set\nup your decentralized profile"}
      </ZnxText>
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
