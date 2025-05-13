import { StyleSheet, Text } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { formatPrice } from "@/utils/formatter";
import { getFontSize } from "@/utils/size";

type DomainPriceProps = {
  price: string;
  symbol: string;
  color?: string;
};

export default function DomainPrice({
  price,
  symbol,
  color = CustomDarkTheme.colors.p500,
}: DomainPriceProps) {
  return (
    <Text style={[styles.price, { color }]}>{`${formatPrice(
      Number(price)
    )} ${symbol}`}</Text>
  );
}

const styles = StyleSheet.create({
  price: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(20),
    textAlign: "right",
  },
});
