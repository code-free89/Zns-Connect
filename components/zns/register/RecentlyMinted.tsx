import { StyleSheet, Text, View, FlatList } from "react-native";
import { CustomDarkTheme } from "@/constants/theme";
import MintItem from "../MintItem";

const mintedDomains = [
  {
    name: "connect",
    type: "poly",
    price: "0.0019 ETH",
  },
  {
    name: "alfredo",
    type: "gold",
    price: "0.0019 ETH",
  },
  {
    name: "connect",
    type: "poly",
    price: "0.0019 ETH",
  },
  {
    name: "alfredo",
    type: "gold",
    price: "0.0019 ETH",
  },
  {
    name: "connect",
    type: "poly",
    price: "0.0019 ETH",
  },
  {
    name: "alfredo",
    type: "gold",
    price: "0.0019 ETH",
  },
  {
    name: "connect",
    type: "poly",
    price: "0.0019 ETH",
  },
  {
    name: "alfredo",
    type: "gold",
    price: "0.0019 ETH",
  },
];

export default function RecentlyMinted() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Minted</Text>

      {mintedDomains.map((domain) => (
        <MintItem key={domain.name} {...domain} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
});
