import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import EmptyGiftCards from "@/components/zns/general-settings/EmptyGiftCards";
import RedeemCreditsModal from "@/components/zns/general-settings/RedeemCreditsModal";
import GiftCard from "@/components/zns/GiftCard";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { GiftCardType } from "@/store/slices/user";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function GiftCardsView() {
  const giftCards = useAppSelector((state) => state.user.giftCards);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedGiftCard, setSelectedGiftCard] = useState<GiftCardType>();

  const handleRedeem = (card: GiftCardType) => {
    setSelectedGiftCard(card);
    setShowRedeemModal(true);
  };

  return (
    <View style={styles.giftCardsContainer}>
      <Text style={styles.giftCardsTitle}>Gift cards</Text>
      {giftCards.length > 0 ? (
        <View style={styles.wrapper}>
          {giftCards.map((giftCard) => (
            <View
              key={giftCard.id}
              style={{
                width: (Dimensions.get("window").width - getWidthSize(48)) / 2,
              }}
            >
              <GiftCard
                credits={Math.floor(Number(giftCard.credits))}
                onRedeem={() => handleRedeem(giftCard)}
              />
            </View>
          ))}
        </View>
      ) : (
        <EmptyGiftCards />
      )}

      <RedeemCreditsModal
        isVisible={showRedeemModal}
        onClose={() => setShowRedeemModal(false)}
        giftCard={selectedGiftCard}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  giftCardsContainer: {
    gap: getHeightSize(12),
  },
  giftCardsTitle: {
    fontSize: getHeightSize(24),
    color: CustomDarkTheme.colors.txtColor,
  },
  wrapper: {
    gap: getHeightSize(16),
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: getHeightSize(60),
  },
});
