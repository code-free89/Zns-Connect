import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";

import SplitLine from "@/components/ui/SplitLine";
import DomainPrice from "@/components/zns/DomainPrice";
import DomainText from "@/components/zns/DomainText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppDispatch } from "@/store";
import {
  CartDomainType,
  handleCartDomainPeriod,
  removeCartDomain,
} from "@/store/slices/cart";
import { cartDomain, handleDomainPeriod } from "@/store/slices/setting";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { useState } from "react";
import RemoveCartModal from "./cart/RemoveCartModal";
interface DomainCartItemProps {
  data: CartDomainType;
}

const AvailableBadge = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <View style={[styles.availableBadge, isAvailable && styles.bgAvailable]}>
      <Text
        style={[styles.availableBadgeText, isAvailable && styles.textAvailable]}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Text>
    </View>
  );
};

const QuantitySelector = ({
  year,
  onPress,
}: {
  year: number;
  onPress: (isAdd: boolean, amount?: number) => void;
}) => {
  return (
    <View style={styles.quantitySelector}>
      <Feather
        name="minus"
        size={12}
        color="white"
        onPress={() => onPress(false)}
      />
      <View style={styles.quantityInput}>
        <Text style={styles.quantity}>
          {year}
          <Text style={styles.quantityUnit}> Y</Text>
        </Text>
      </View>
      <Feather
        name="plus"
        size={12}
        color="white"
        onPress={() => onPress(true)}
      />
    </View>
  );
};

export default function DomainCartItem({ data }: DomainCartItemProps) {
  const { id: domainId, price, domainName, chainId, year, symbol } = data;
  const dispatch = useAppDispatch();
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

  const handlePeriod = (isAdd: boolean, amount?: number) => {
    dispatch(handleDomainPeriod({ ...data, isAdd, updateAmount: amount }));
    dispatch(handleCartDomainPeriod({ ...data, isAdd, updateAmount: amount }));
  };

  const removeItem = () => {
    dispatch(cartDomain(data));
    dispatch(removeCartDomain(data));
    setIsRemoveModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.domainContainer}>
        <DomainText domainName={domainName} chainId={chainId} />
        <DomainPrice price={price} symbol={symbol} />
      </View>

      <QuantitySelector year={year} onPress={handlePeriod} />

      <AvailableBadge isAvailable={Number(domainId) === 0} />

      <SplitLine direction="vertical" />

      <Feather
        name="trash-2"
        size={14}
        color={"#FF4444"}
        onPress={() => setIsRemoveModalVisible(true)}
      />

      <RemoveCartModal
        isVisible={isRemoveModalVisible}
        onClose={() => setIsRemoveModalVisible(false)}
        onSubmit={removeItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(9),
    borderRadius: getWidthSize(12),
    gap: getWidthSize(10),
  },
  domainContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  availableBadge: {
    borderRadius: 8,
    width: getWidthSize(77),
    paddingVertical: getHeightSize(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF05051A",
    borderColor: "#FF050599",
    borderWidth: 0.5,
  },
  availableBadgeText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(10),
    color: "#FF0505AD",
  },
  bgAvailable: {
    backgroundColor: "#05ABFF1A",
    borderColor: "#05ABFF99",
  },
  textAvailable: {
    color: "#05ABFFAD",
  },
  quantitySelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 12,
    gap: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    // height: getHeightSize(30),
    paddingHorizontal: getWidthSize(12),
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: getHeightSize(4),
  },
  quantity: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    color: "white",
  },
  quantityUnit: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.body,
  },
});
