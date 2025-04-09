import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ZnsDropdown from "@/components/ui/Dropdown";
import { CustomDarkTheme } from "@/constants/theme";

const NetworkItems = [
  {
    label: "Polygon",
    value: "polygon",
  },
  {
    label: "Ethereum",
    value: "ethereum",
  },
  {
    label: "Solana",
    value: "solana",
  },
];

export default function NetworkSelect() {
  const [selectedNetwork, setSelectedNetwork] = useState("polygon");

  return (
    <View style={styles.container}>
      <ZnsDropdown
        label="Switch Network"
        value={selectedNetwork}
        setValue={setSelectedNetwork}
        items={NetworkItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  title: {
    color: CustomDarkTheme.colors.body,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 8,
  },
});
