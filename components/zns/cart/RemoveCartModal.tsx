import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { StyleSheet, Text, View } from "react-native";
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
    <Modal isVisible={isVisible} backdropColor="black">
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Remove from cart?</Text>
          <Text style={styles.description}>
            {"The selected domain will be\nremoved from cart"}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            variant="text"
            title="Remove"
            style={{ flex: 1 }}
            textStyle={styles.errorText}
            onPress={onSubmit}
          />
          <Button
            title="No"
            textStyle={styles.noText}
            onPress={onClose}
            style={{ flex: 1 }}
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
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(40),
    flexDirection: "column",
    gap: getHeightSize(24),
  },
  buttonContainer: {
    flexDirection: "row",
  },
  errorText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.error,
  },
  noText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.p950,
  },
  titleContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
    paddingHorizontal: getWidthSize(20),
    paddingVertical: getHeightSize(16),
    gap: getHeightSize(12),
  },
  title: {
    color: CustomDarkTheme.colors.txtColor,
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    textAlign: "center",
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
