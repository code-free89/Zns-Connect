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
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

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
      <Text style={styles.registrationBadgeText}>REGISTRATION</Text>
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
    <Modal isVisible={isVisible} backdropColor="#171810" backdropOpacity={0.9}>
      <View style={styles.modalContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
          <AntDesign
            name="close"
            size={14}
            color={"#E2E4E3"}
            style={{ padding: 6 }}
            onPress={() => onClose(false)}
          />
        </View>

        <View style={styles.orderSummaryContainer}>
          <Text style={styles.orderSummaryTitle}>
            Order Summary for {networkShortName}
          </Text>

          <RegistrationBadge />

          <View style={styles.priceSummaryContainer}>
            <Text style={styles.priceSummaryTitle}>
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
            <Text style={styles.priceTitle}>Subtotal</Text>
            <Text style={styles.priceValue}>
              {`${formatPrice(Number(formatEther(totalPrice)))}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Available Credits</Text>
            <Text style={styles.priceValue}>
              {`${formatPrice(creditPrice)}`}{" "}
              <Text style={styles.priceCurrency}>{symbol}</Text>
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Total Price</Text>
            <Text style={styles.priceValue}>
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
          onPress={() => beforeHandleCheckout()}
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
    paddingHorizontal: getWidthSize(14),
    paddingVertical: getHeightSize(16),
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    gap: getHeightSize(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.grey1,
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.4,
  },
  orderSummaryTitle: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.txtColor,
    fontSize: getFontSize(20),
    lineHeight: getFontSize(20) * 1.5,
    marginBottom: getHeightSize(8),
  },
  orderSummaryContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  registrationBadge: {
    backgroundColor: "#283200",
    borderRadius: 8,
    paddingHorizontal: getWidthSize(8),
    paddingVertical: getHeightSize(4),
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  registrationBadgeText: {
    color: CustomDarkTheme.colors.p500,
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
  priceSummaryContainer: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
    borderRadius: 15,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(20),
    marginVertical: getHeightSize(20),
  },
  priceSummaryTitle: {
    ...fontStyles["Poppins-SemiBold"],
    color: `${CustomDarkTheme.colors.txtColor}C2`,
    fontSize: getFontSize(14),
    marginBottom: getHeightSize(11),
    lineHeight: getFontSize(14) * 1.5,
  },
  price: {
    color: CustomDarkTheme.colors.primary,
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.1,
  },
  priceCurrency: {
    fontSize: getFontSize(12),
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: getHeightSize(16),
    width: "100%",
  },
  priceTitle: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.body,
    lineHeight: getFontSize(16) * 1.5,
  },
  priceValue: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.1,
    color: CustomDarkTheme.colors.txtColor,
  },
});
