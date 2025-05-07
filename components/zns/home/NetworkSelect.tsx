import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount, useSwitchChain } from "wagmi";

import ZnsDropdown from "@/components/ui/Dropdown";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, getChainIcon } from "@/constants/web3/chains";
import { showErrorToast } from "@/utils/toast";

const NetworkItems = CHAINS.map((chain) => ({
  label: chain.name,
  value: chain.id.toString(),
  icon: chain.icon,
}));

export default function NetworkSelect() {
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [selectedNetwork, setSelectedNetwork] = useState(
    chain?.id.toString() || "1"
  );

  // Update selected network when chain changes
  useEffect(() => {
    if (chain?.id) {
      setSelectedNetwork(chain.id.toString());
    }
  }, [chain?.id]);

  const handleNetworkChange = async (value: string) => {
    try {
      setSelectedNetwork(value);
      if (switchChainAsync) {
        await switchChainAsync({ chainId: parseInt(value) });
      }
    } catch (error) {
      showErrorToast("Failed to switch network");
    }
  };

  return (
    <ZnsDropdown
      label="Switch Network"
      placeholder="Select a network"
      value={selectedNetwork}
      setValue={handleNetworkChange}
      items={NetworkItems}
    />
  );
}
