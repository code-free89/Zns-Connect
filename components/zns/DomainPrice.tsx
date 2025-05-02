import { StyleSheet, Text } from "react-native";

import { formatPrice } from "@/utils/formatter";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";

type DomainPriceProps = {
  price: string;
  symbol: string;
};

export default function DomainPrice({ price, symbol }: DomainPriceProps) {
  return (
    <Text style={[fontStyles["Poppins-SemiBold"], styles.price]}>
      {`${formatPrice(Number(price))} ${symbol}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "right",
  },
});
