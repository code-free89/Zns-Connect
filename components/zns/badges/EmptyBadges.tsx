import { Text, View, StyleSheet } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";

export default function EmptyBadges() {
  return (
    <View style={styles.container}>
      <Text style={[fontStyles["Poppins-SemiBold"], styles.noBadges]}>
        You don't have any badges yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noBadges: {
    fontSize: 18,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
