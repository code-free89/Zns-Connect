import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import QRCode from "react-native-qrcode-svg";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  address: string;
}

export default function AddressQRModal({ isVisible, onClose, address }: Props) {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <QRCode
          logo={require("@/assets/images/logo.png")}
          value={address}
          size={128}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
});
