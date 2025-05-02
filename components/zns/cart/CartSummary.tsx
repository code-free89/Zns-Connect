import { StyleSheet, Text, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function CartSummary() {
  const { carts } = useAppSelector((state) => state.setting);

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Cart items</Text>
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
    paddingHorizontal: 12,
    paddingTop: 13,
    paddingBottom: 17,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: "#FFFFFF",
  },
  summaryCount: {
    fontSize: 12,
    fontWeight: 500,
    color: CustomDarkTheme.colors.primary,
  },
  summaryDescription: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
    marginTop: 10,
  },
});
