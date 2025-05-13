import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function CartSummary() {
  const { carts } = useAppSelector((state) => state.setting);

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Your Cart</Text>
        <Text style={styles.summaryCount}>{carts.length} items</Text>
      </View>
      <Text style={styles.summaryDescription}>
        Domain purchases entail a single payment and come with a 90% discount on
        renewal fees.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    borderWidth: 0.5,
    borderColor: "#FFFFFF33",
    borderRadius: 15,
    paddingHorizontal: getWidthSize(12),
    paddingTop: getHeightSize(13),
    paddingBottom: getHeightSize(17),
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.1,
    color: "#FFFFFF",
  },
  summaryCount: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.1,
    color: CustomDarkTheme.colors.primary,
  },
  summaryDescription: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.body,
    marginTop: getHeightSize(10),
    textTransform: "capitalize",
  },
});
