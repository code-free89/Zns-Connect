import Button from "@/components/ui/Button";
import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";

interface RemoveCartModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function RemoveCartModal({
  isVisible,
  onClose,
  onSubmit,
}: RemoveCartModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Remove from cart?</Text>
          <Text style={styles.description}>
            {"The selected domain will\nbe removed from cart"}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="No" onPress={onClose} style={{ flex: 1 }} />
          <Button
            variant="text"
            title="Remove"
            style={{ flex: 1 }}
            textStyle={styles.errorText}
            onPress={onSubmit}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: "black",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 40,
    flexDirection: "column",
    gap: 24,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  errorText: {
    color: CustomDarkTheme.colors.error,
  },
  titleContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  title: {
    color: CustomDarkTheme.colors.txtColor,
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
    lineHeight: 20,
  },
});
