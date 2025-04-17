import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import ZnsText from "@/components/ui/Text";

export default function EmptySearchResult() {
  return (
    <View style={styles.container}>
      <ZnsText type="semiBold" style={styles.title}>
        Search Results appear here
      </ZnsText>
      <ZnsText type="regular" style={styles.description}>
        {"Search your domains, mint and set\nup your decentralized profile"}
      </ZnsText>
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
