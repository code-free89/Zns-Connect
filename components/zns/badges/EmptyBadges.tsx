import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize } from "@/utils/size";

export default function EmptyBadges() {
  return (
    <View style={styles.container}>
      <Text style={styles.noBadges}>You don't have any badges yet</Text>
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
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
