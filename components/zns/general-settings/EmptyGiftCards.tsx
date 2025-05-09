import { Image, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function EmptyGiftCards() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icons/empty/gift.png")}
        style={{ width: getWidthSize(87), height: getHeightSize(87) }}
      />
      <Text style={styles.title}>You don’t have any gift card</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: getHeightSize(12),
    paddingBottom: getHeightSize(60),
  },
  title: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getHeightSize(18),
    color: "white",
  },
});
