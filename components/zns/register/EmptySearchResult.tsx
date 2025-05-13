import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize } from "@/utils/size";

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
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
