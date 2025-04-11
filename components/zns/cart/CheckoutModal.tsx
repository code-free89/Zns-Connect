import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { CustomDarkTheme } from "@/constants/theme";
import Button from "@/components/ui/Button";

interface CheckoutModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const RegistrationBadge = () => {
  return (
    <View style={styles.registrationBadge}>
      <MaterialCommunityIcons
        name="web"
        size={20}
        color={CustomDarkTheme.colors.p500}
      />
      <Text style={styles.registrationBadgeText}>REGISTRATION</Text>
    </View>
  );
};

export default function CheckoutModal({
  isVisible,
  onClose,
}: CheckoutModalProps) {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
          <AntDesign
            name="close"
            size={14}
            color={"#E2E4E3"}
            style={{ padding: 6 }}
            onPress={onClose}
          />
        </View>

        <View style={styles.orderSummaryContainer}>
          <Text style={styles.orderSummaryTitle}>Order Summary for Poly</Text>
          <RegistrationBadge />

          <View style={styles.priceSummaryContainer}>
            <Text style={styles.priceSummaryTitle}>
              Registration Price for 1 Domain (polygon)
            </Text>
            <Text style={styles.price}>
              0.0019 <Text style={styles.priceCurrency}>POL</Text>
            </Text>
          </View>
        </View>
        <Button title="Complete Purchase" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.modalBackground,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    color: CustomDarkTheme.colors.grey1,
    fontSize: 14,
    fontWeight: 600,
  },
  orderSummaryTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: CustomDarkTheme.colors.txtColor,
    marginBottom: 8,
  },
  orderSummaryContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  registrationBadge: {
    backgroundColor: "#283200",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  registrationBadgeText: {
    color: CustomDarkTheme.colors.p500,
    fontSize: 14,
    fontWeight: 500,
  },
  priceSummaryContainer: {
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginVertical: 20,
  },
  priceSummaryTitle: {
    color: `${CustomDarkTheme.colors.txtColor}C2`,
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 11,
  },
  price: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 16,
    fontWeight: 600,
  },
  priceCurrency: {
    fontSize: 12,
  },
});
