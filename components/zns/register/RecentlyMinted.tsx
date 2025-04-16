import { StyleSheet, View, FlatList } from "react-native";
import ZnxText from "@/components/ui/Text";
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
      <ZnxText type="medium" style={styles.title}>
        Recently Minted
      </ZnxText>

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
