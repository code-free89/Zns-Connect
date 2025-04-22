import { useMemo } from "react";
import { useAccount, useReadContract } from "wagmi";

import { NETWORKS, isChainSupported } from "@/constants/web3/chains";
import { CONTRACT_DATA } from "@/constants/web3/contracts";
import { UseContractType } from "@/hooks/web3/core/type";

export const useContract = ({
  contract,
  functionName,
  args = null,
  chainId,
}: UseContractType) => {
  const { chainId: activeChainID } = useAccount();

  const chain = useMemo(
    () => (chainId ? chainId : activeChainID) as NETWORKS,
    [chainId, activeChainID]
  );

  const { abi, address } = useMemo(() => {
    const { abi, addresses } = CONTRACT_DATA[contract];
    return { abi, address: addresses[chain] };
  }, [chain, contract]);

  const { data, queryKey, isLoading } = useReadContract({
    abi: abi,
    address: address,
    functionName,
    args,
    chainId: chain,
  });

  if (!isChainSupported(chain)) {
    return { data: null, queryKey: null, isLoading: false };
  }

  return { data, queryKey, isLoading };
};
