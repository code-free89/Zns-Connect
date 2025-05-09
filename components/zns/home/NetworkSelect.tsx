import { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useAccount, useSwitchChain } from "wagmi";

import NetworkSelectDropdown from "@/components/zns/NetworkSelectDropdown";
import { CHAINS } from "@/constants/web3/chains";
import { showErrorToast } from "@/utils/toast";

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
};

export default function NetworkSelect({ containerStyle }: Props) {
  const { chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const [selectedNetwork, setSelectedNetwork] = useState(
    chain?.id.toString() || "1"
  );
  const NetworkItems = CHAINS.map((chain) => ({
    id: chain.id,
    label: chain.name,
    value: chain.id.toString(),
    icon: chain.icon,
  }));

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
    <NetworkSelectDropdown
      label="Switch Network"
      placeholder="Select a network"
      value={selectedNetwork}
      setValue={handleNetworkChange}
      items={NetworkItems}
      containerStyle={containerStyle}
    />
  );
}
