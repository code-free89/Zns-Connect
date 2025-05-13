import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type GiftCardProps = {
  credits: number;
  onRedeem: () => void;
};

export default function GiftCard({ credits, onRedeem }: GiftCardProps) {
  return (
    <View style={styles.giftCardContainer}>
      <Image
        source={require("@/assets/images/app/gift-card.png")}
        width={getWidthSize(85)}
        height={getWidthSize(45)}
        style={styles.giftCard}
      />
      <Image
        source={require("@/assets/images/app/zns-connect.png")}
        style={styles.logo}
      />
      <View style={styles.creditsContainer}>
        <Text style={styles.creditsTitle}>ZNS GIFT CARD</Text>
        <Text style={styles.creditsAmount}>CREDITS: {credits}</Text>
      </View>
      <Pressable style={styles.redeemButton} onPress={onRedeem}>
        <Text style={styles.redeemButtonText}>Redeem</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  giftCardContainer: {
    borderRadius: 12,
    flex: 1,
    aspectRatio: 1.78,
  },
  giftCard: {
    borderRadius: 12,
    flex: 1,
    aspectRatio: 1.78,
  },
  logo: {
    position: "absolute",
    left: getWidthSize(8),
    top: getHeightSize(-2),
    width: "30%",
    aspectRatio: 3,
    resizeMode: "contain",
  },
  creditsContainer: {
    position: "absolute",
    bottom: getHeightSize(6),
    left: getWidthSize(8),
  },
  creditsTitle: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(9),
    lineHeight: getFontSize(9) * 1.5,
    color: CustomDarkTheme.colors.primary,
  },
  creditsAmount: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(9),
    lineHeight: getFontSize(9) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  redeemButton: {
    position: "absolute",
    bottom: getHeightSize(6),
    right: getWidthSize(8),
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
    paddingHorizontal: getWidthSize(8),
    paddingVertical: getHeightSize(4),
    borderRadius: getWidthSize(19),
    borderWidth: getWidthSize(0.7),
    borderColor: CustomDarkTheme.colors.primary,
  },
  redeemButtonText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(10),
    lineHeight: getFontSize(10) * 1.5,
    color: CustomDarkTheme.colors.primary,
    marginTop: getHeightSize(2),
  },
});
