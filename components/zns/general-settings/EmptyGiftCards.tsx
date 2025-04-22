import { Image, StyleSheet, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";

export default function EmptyGiftCards() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icons/gift-card-empty.png")} />
      <ZnsText type="bold" style={styles.title}>
        You don’t have any gift card
      </ZnsText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
});
