import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import { CustomDarkTheme } from "@/constants/theme";
import DomainTypeSelect from "../DomainTypeSelect";
import DomainCartItem from "../DomainCartItem";

const domains = [
  {
    name: "wasiu",
    type: "poly",
    price: 100,
    isAvailable: true,
  },
];

export default function CartItemList() {
  const [selectedDomainType, setSelectedDomainType] = useState("poly");

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Cart items</Text>
          <Text style={styles.summaryCount}>5 items</Text>
        </View>
        <Text style={styles.summaryDescription}>
          Domain purchases entail a single payment and come with a 90% discount
          on renewal fees.
        </Text>
      </View>

      <DomainTypeSelect />

      <FlatList
        data={Array(10).fill(domains[0])}
        renderItem={({ item }) => <DomainCartItem {...item} />}
        contentContainerStyle={styles.domainContainer}
      />

      <Button title={"Checkout"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
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
  domainContainer: {
    flexDirection: "column",
    gap: 12,
  },
});
