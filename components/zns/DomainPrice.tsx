import { StyleSheet, Text } from "react-native";

import { formatPrice } from "@/utils/formatter";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize } from "@/utils/size";

type DomainPriceProps = {
  price: string;
  symbol: string;
};

export default function DomainPrice({ price, symbol }: DomainPriceProps) {
  return (
    <Text style={styles.price}>
      {`${formatPrice(Number(price))} ${symbol}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(20),
    color: CustomDarkTheme.colors.p500,
    textAlign: "right",
  },
});
