import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount, useSwitchChain, useConnect } from "wagmi";

import ZnsDropdown from "@/components/ui/Dropdown";
import { CustomDarkTheme } from "@/constants/theme";
import { chains } from "@/components/zns/web3modal/common";
import { getChainIcon } from "@/constants/web3/chains";
import { showSuccessToast, showErrorToast } from "@/utils/toast";

const NetworkItems = chains.map((chain) => ({
  label: chain.name,
  value: chain.id.toString(),
  icon: getChainIcon(chain.id),
}));

export default function NetworkSelect() {
  const { chain, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { connect, connectors } = useConnect();
  const [selectedNetwork, setSelectedNetwork] = useState(
    chain?.id.toString() || "1"
  );
  console.log("chain", chain, isConnected);

  // Update selected network when chain changes
  useEffect(() => {
    if (chain?.id) {
      setSelectedNetwork(chain.id.toString());
    }
  }, [chain?.id]);

  const handleNetworkChange = async (value: string) => {
    try {
      setSelectedNetwork(value);
      if (switchChain) {
        switchChain(
          { chainId: parseInt(value) },
          {
            onSuccess: () => {
              showSuccessToast("Network switched successfully");
              // If disconnected after switch, reconnect using the first available connector
              if (!isConnected && connectors[0]) {
                connect({ connector: connectors[0] });
              }
            },
            onError: (error) => {
              showErrorToast("Failed to switch network");
              console.error("Network switch error:", error);
            },
          }
        );
      }
    } catch (error) {
      console.error("Network switch error:", error);
      showErrorToast("Failed to switch network");
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
