import { Image, Pressable, StyleSheet, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";

type GiftCardProps = {
  credits: number;
};

export default function GiftCard({ credits }: GiftCardProps) {
  return (
    <View style={styles.giftCardContainer}>
      <Image
        source={require("@/assets/images/app/gift-card.png")}
        width={85}
        height={45}
        style={styles.giftCard}
      />
      <Image
        source={require("@/assets/images/app/zns-connect.png")}
        style={styles.logo}
      />
      <View style={styles.creditsContainer}>
        <ZnsText type="bold" style={styles.creditsTitle}>
          ZNS GIFT CARD
        </ZnsText>
        <ZnsText type="bold" style={styles.creditsAmount}>
          CREDITS: {credits}
        </ZnsText>
      </View>
      <Pressable style={styles.redeemButton}>
        <ZnsText type="medium" style={styles.redeemButtonText}>
          Redeem
        </ZnsText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  giftCardContainer: {
    borderRadius: 12,
    backgroundColor: "red",
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
    left: 8,
    top: -2,
    width: "30%",
    aspectRatio: 3,
    resizeMode: "contain",
  },
  creditsContainer: {
    position: "absolute",
    bottom: 6,
    left: 8,
  },
  creditsTitle: {
    fontSize: 9,
    color: CustomDarkTheme.colors.primary,
  },
  creditsAmount: {
    fontSize: 9,
    color: CustomDarkTheme.colors.txtColor,
  },
  redeemButton: {
    position: "absolute",
    bottom: 6,
    right: 8,
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 19,
    borderWidth: 0.7,
    borderColor: CustomDarkTheme.colors.primary,
  },
  redeemButtonText: {
    fontSize: 10,
    color: CustomDarkTheme.colors.primary,
    marginTop: 2,
  },
});
