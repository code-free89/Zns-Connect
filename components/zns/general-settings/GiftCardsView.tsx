import { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import EmptyGiftCards from "@/components/zns/general-settings/EmptyGiftCards";
import RedeemCreditsModal from "@/components/zns/general-settings/RedeemCreditsModal";
import GiftCard from "@/components/zns/GiftCard";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { GiftCardType } from "@/store/slices/user";

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
      <ZnsText type="medium" style={styles.giftCardsTitle}>
        Gift cards
      </ZnsText>
      {giftCards.length > 0 ? (
        <View style={{ gap: 16, flexDirection: "row", flexWrap: "wrap" }}>
          {giftCards.map((giftCard) => (
            <View
              key={giftCard.id}
              style={{ width: (Dimensions.get("window").width - 48) / 2 }}
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
    gap: 12,
  },
  giftCardsTitle: {
    fontSize: 24,
    color: CustomDarkTheme.colors.txtColor,
  },
});
