import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { formatEther } from "viem";

import InteractiveButton from "@/components/ui/InteractiveButton";
import CreditUse from "@/components/zns/cart/checkout-modal/CreditUse";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainByID, isChainSupported } from "@/constants/web3/chains";
import { useCheckout } from "@/hooks/useCheckout";
import { useAppSelector } from "@/store";
import { formatPrice } from "@/utils/formatter";
interface CheckoutModalProps {
  isVisible: boolean;
  onClose: (isSuccess?: boolean) => void;
}

const RegistrationBadge = () => {
  return (
    <View style={styles.registrationBadge}>
      <MaterialCommunityIcons
        name="web"
        size={20}
        color={CustomDarkTheme.colors.p500}
      />
      <Text
        style={[fontStyles["Poppins-Medium"], styles.registrationBadgeText]}
      >
        REGISTRATION
      </Text>
    </View>
  );
};

export default function CheckoutModal({
  isVisible,
  onClose,
}: CheckoutModalProps) {
  const { selectedChain } = useAppSelector((state) => state.cart);
  const symbol = useMemo(
    () => getChainByID(selectedChain).nativeCurrency.symbol ?? "",
    [selectedChain]
  );

  const networkShortName = useMemo(
    () =>
      isChainSupported(selectedChain ?? 0)
        ? getChainByID(selectedChain).shortName
        : "",
    [selectedChain]
  );
  const successCallback = () => {
    onClose(true);
  };

  const {
    selectedDomains,
    isEnoughBalance,
    isProcessing,
    totalPrice,
    creditPrice,
    finalPrice,
    creditAmount,
    onMaxAmount,
    onCreditAmountChange,
    onCheckout,
  } = useCheckout(successCallback);

  const beforeHandleCheckout = () => {
    onCheckout();
  };

  const error = useMemo(() => {
    if (isProcessing) return;
    if (selectedDomains.length < 1) {
      return { isError: true, text: "No Domains" };
    }
    if (!isEnoughBalance) {
      return { isError: true, text: "Insufficient Balance" };
    }
  }, [selectedDomains, isEnoughBalance, isProcessing]);

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={[fontStyles["Poppins-SemiBold"], styles.title]}>
            Checkout
          </Text>
          <AntDesign
            name="close"
            size={14}
            color={"#E2E4E3"}
            style={{ padding: 6 }}
            onPress={() => onClose(false)}
          />
        </View>

        <View style={styles.orderSummaryContainer}>
          <Text
            style={[fontStyles["Poppins-SemiBold"], styles.orderSummaryTitle]}
          >
            Order Summary for {networkShortName}
          </Text>

          <RegistrationBadge />

          <View style={styles.priceSummaryContainer}>
            <Text
              style={[fontStyles["Poppins-SemiBold"], styles.priceSummaryTitle]}
            >
              Registration Price for {selectedDomains.length} Domain (
              {networkShortName})
            </Text>
            <Text style={styles.price}>
              {`${formatPrice(Number(formatEther(totalPrice)))}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>

          <CreditUse
            creditAmount={creditAmount.toString()}
            onAmountChange={onCreditAmountChange}
            onMaxAmount={onMaxAmount}
            onClose={() => onClose(false)}
          />

          <View style={styles.priceContainer}>
            <Text style={[fontStyles["Poppins-Regular"], styles.priceTitle]}>
              Subtotal
            </Text>
            <Text style={[fontStyles["Poppins-SemiBold"], styles.priceValue]}>
              {`${formatPrice(Number(formatEther(totalPrice)))}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[fontStyles["Poppins-Regular"], styles.priceTitle]}>
              Available Credits
            </Text>
            <Text style={[fontStyles["Poppins-SemiBold"], styles.priceValue]}>
              {`${formatPrice(creditPrice)}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[fontStyles["Poppins-Regular"], styles.priceTitle]}>
              Total Price
            </Text>
            <Text style={[fontStyles["Poppins-SemiBold"], styles.priceValue]}>
              {`${formatPrice(Number(formatEther(finalPrice)))}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>
        </View>
        <InteractiveButton
          title="Complete Purchase"
          requiredConnect
          requiredChain={selectedChain}
          loading={isProcessing}
          onPress={beforeHandleCheckout}
          error={error}
        />
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
  },
  orderSummaryTitle: {
    fontSize: 20,
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
    lineHeight: 14 * 1.5,
  },
  priceSummaryContainer: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 20,
    marginVertical: 20,
  },
  priceSummaryTitle: {
    color: `${CustomDarkTheme.colors.txtColor}C2`,
    fontSize: 14,
    marginBottom: 11,
    lineHeight: 14 * 1.5,
  },
  price: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 16,
    fontWeight: 600,
  },
  priceCurrency: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 16,
    width: "100%",
  },
  priceTitle: {
    fontSize: 16,
    color: CustomDarkTheme.colors.body,
    lineHeight: 16 * 1.5,
  },
  priceValue: {
    fontSize: 16,
    lineHeight: 16 * 1.1,
    color: CustomDarkTheme.colors.txtColor,
  },
});
