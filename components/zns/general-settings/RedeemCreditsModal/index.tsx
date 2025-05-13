import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import CloseButton from "@/components/ui/CloseButton";
import RedeemCreditsSection from "@/components/zns/general-settings/RedeemCreditsModal/RedeemCredits";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { GiftCardType } from "@/store/slices/user";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
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
        <Text style={styles.modalTitle}>Redeem or Send credits</Text>
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
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "center",
    marginBottom: getHeightSize(28),
    marginTop: getHeightSize(50),
  },
  modalContent: {
    backgroundColor: "black",
    borderRadius: getWidthSize(14),
    borderWidth: getWidthSize(2),
    borderColor: "rgba(41, 41, 37, 0.80)",
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(20),
    gap: getWidthSize(24),
  },
});
