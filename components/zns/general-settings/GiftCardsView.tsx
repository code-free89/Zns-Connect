import { Dimensions, FlatList, StyleSheet, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import EmptyGiftCards from "@/components/zns/general-settings/EmptyGiftCards";
import GiftCard from "@/components/zns/GiftCard";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function GiftCardsView() {
  const giftCards = useAppSelector((state) => state.user.giftCards);

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
              <GiftCard credits={Math.floor(Number(giftCard.credits))} />
            </View>
          ))}
        </View>
      ) : (
        <EmptyGiftCards />
      )}
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
