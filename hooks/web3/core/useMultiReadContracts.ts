import { useMemo } from "react";
import { useAccount, useReadContracts as useWagmiReadContract } from "wagmi";

import { NETWORKS, isChainSupported } from "@/constants/web3/chains";
import { CONTRACT_DATA } from "@/constants/web3/contracts";
import { UseContractType } from "@/hooks/web3/core/type";

export const useMultiReadContracts = (
  calls: Omit<UseContractType, "chainId">[],
  chainId?: NETWORKS
) => {
  const { chainId: activeChainID } = useAccount();

  const chain = useMemo(
    () => (chainId ? chainId : activeChainID) as NETWORKS,
    [chainId, activeChainID]
  );

  const contractsToCall = useMemo(() => {
    return calls.map((call) => {
      const { contract, functionName, args } = call;
      const { abi, addresses } = CONTRACT_DATA[contract];
      return {
        abi: abi,
        address: addresses[chain],
        functionName,
        args,
        chainId: chain,
      };
    });
  }, [chain, calls]);

  const { data, queryKey, isLoading } = useWagmiReadContract({
    contracts: contractsToCall,
  });

  if (!isChainSupported(chain)) {
    return { data: null, queryKey: null, isLoading: false };
  }

  return { data, queryKey, isLoading };
};
