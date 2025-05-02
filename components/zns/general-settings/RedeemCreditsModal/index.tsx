import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import CloseButton from "@/components/ui/CloseButton";
import ZnsText from "@/components/ui/Text";
import RedeemCreditsSection from "@/components/zns/general-settings/RedeemCreditsModal/RedeemCredits";
import { GiftCardType } from "@/store/slices/user";
import ResendGiftCardSection from "./ResendGiftCard";

type RedeemCreditsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  giftCard?: GiftCardType;
};

export default function RedeemCreditsModal({
  isVisible,
  onClose,
  giftCard,
}: RedeemCreditsModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <CloseButton onClose={onClose} />
      <View style={styles.modalContainer}>
        <ZnsText type="medium" style={styles.modalTitle}>
          Redeem or Send credits
        </ZnsText>
        <View style={styles.modalContent}>
          <RedeemCreditsSection giftCard={giftCard} onClose={onClose} />

          <ResendGiftCardSection giftCard={giftCard} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    // position: "absolute",
    // top: 0,
    // width: "100%",
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 28,
    marginTop: 50,
  },
  modalContent: {
    backgroundColor: "black",
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(41, 41, 37, 0.80)",
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 24,
  },
});
