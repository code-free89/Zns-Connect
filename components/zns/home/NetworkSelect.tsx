import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount, useSwitchChain } from "wagmi";

import ZnsDropdown from "@/components/ui/Dropdown";
import { CustomDarkTheme } from "@/constants/theme";
import { chains } from "@/components/zns/web3modal/common";
import { getChainIcon } from "@/constants/web3/chains";

const NetworkItems = chains.map((chain) => ({
  label: chain.name,
  value: chain.id.toString(),
  icon: getChainIcon(chain.id),
}));

export default function NetworkSelect() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [selectedNetwork, setSelectedNetwork] = useState(
    chain?.id.toString() || "1"
  );

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
    if (switchChain) {
      switchChain({ chainId: parseInt(value) });
    }
  };

  return (
    <View style={styles.container}>
      <ZnsDropdown
        label="Switch Network"
        placeholder="Select a network"
        value={selectedNetwork}
        setValue={handleNetworkChange}
        items={NetworkItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    color: CustomDarkTheme.colors.body,
    fontWeight: 400,
    fontSize: 14,
    marginBottom: 8,
  },
});
