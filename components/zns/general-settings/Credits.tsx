import { StyleSheet, View } from "react-native";

import Button from "@/components/ui/Button";
import ZnsText from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import EmptyGiftCards from "@/components/zns/general-settings/EmptyGiftCards";
import { CustomDarkTheme } from "@/constants/theme";

export default function CreditsAndGiftCards() {
  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <ZnsText type="medium" style={styles.title}>
          Buy credits
        </ZnsText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ZnsText style={styles.key}>Current credits</ZnsText>
          <Button
            title="96 credits"
            fontType="medium"
            style={styles.creditButton}
            textStyle={styles.creditText}
          />
        </View>
        <TextInput label="Buy credits" placeholder="0" />
        <Button title="Buy credits" fontType="medium" />
      </View>

      <View style={styles.creditsContainer}>
        <ZnsText type="medium" style={styles.title}>
          Send credits
        </ZnsText>
        <TextInput
          label="Enter amount and address to send to"
          placeholder="0"
        />
        <TextInput placeholder="Enter address to send credits" />
        <Button title="Transfer" fontType="medium" />
      </View>

      <View style={styles.giftCardsContainer}>
        <ZnsText type="medium" style={styles.giftCardsTitle}>
          Gift cards
        </ZnsText>
        <EmptyGiftCards />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 24,
  },
  creditsContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
  },
  key: {
    fontSize: 14,
    color: CustomDarkTheme.colors.body,
  },
  creditButton: {
    borderRadius: 12,
    width: "auto",
    backgroundColor: "#05ABFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  creditText: {
    color: "#243300",
  },
  giftCardsTitle: {
    fontSize: 24,
    color: CustomDarkTheme.colors.txtColor,
  },
  giftCardsContainer: {
    gap: 12,
  },
});
