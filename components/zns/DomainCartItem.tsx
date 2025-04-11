import { StyleSheet, View, Text } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { domainColors } from "@/constants/Colors";
import { CustomDarkTheme } from "@/constants/theme";
import SplitLine from "../ui/SplitLine";

interface DomainCartItemProps {
  name: string;
  type: string;
  price: number;
  isAvailable: boolean;
  onRemove: () => void;
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

const QuantitySelector = () => {
  return (
    <View style={styles.quantitySelector}>
      <Feather name="minus" size={12} color="white" />
      <View style={styles.quantityInput}>
        <Text style={styles.quantity}>
          1<Text style={styles.quantityUnit}> Y</Text>
        </Text>
      </View>
      <Feather name="plus" size={12} color="white" />
    </View>
  );
};

export default function DomainCartItem({
  name,
  type,
  price,
  isAvailable,
  onRemove,
}: DomainCartItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.domainContainer}>
        <Text style={styles.domain}>
          {name}
          <Text
            style={{ color: domainColors[type as keyof typeof domainColors] }}
          >
            .{type}
          </Text>
        </Text>
        <Text style={styles.price}>${price}</Text>
      </View>

      <QuantitySelector />

      <AvailableBadge isAvailable={isAvailable} />

      <SplitLine direction="vertical" />

      <Feather name="trash-2" size={14} color={"#FF4444"} onPress={onRemove} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    gap: 10,
  },
  domainContainer: {
    flexDirection: "column",
  },
  domain: {
    fontSize: 14,
    fontWeight: 500,
    color: "white",
  },
  price: {
    fontSize: 12,
    fontWeight: 500,
    color: CustomDarkTheme.colors.textPrimary,
  },
  availableBadge: {
    borderRadius: 8,
    width: 77,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF05051A",
    borderColor: "#FF050599",
    borderWidth: 0.5,
  },
  availableBadgeText: {
    fontSize: 10,
    fontWeight: 600,
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
    height: 25,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 14,
    fontWeight: 500,
    color: "white",
  },
  quantityUnit: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
});
