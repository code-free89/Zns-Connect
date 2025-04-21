import { useCallback } from "react";
import { useAccount } from "wagmi";

import { NETWORKS, isChainSupported } from "@/constants/web3/chains";
import { CONTRACT_DATA } from "@/constants/web3/contracts";
import { UseContractType } from "@/hooks/web3/core/type";
import { viemClients } from "@/utils/viem";

export const useReadCall = () => {
  const { chainId: activeChainID } = useAccount();

  const callContract = useCallback(
    async (call: Omit<UseContractType, "chainId">, chainId?: NETWORKS) => {
      const chain = (chainId ? chainId : activeChainID) as NETWORKS;
      if (!chain || !isChainSupported(chain)) {
        console.error("Not supported Chain");
        return null;
      }

      const { contract, functionName, args } = call;
      const { abi, addresses } = CONTRACT_DATA[contract];
      const _call = {
        abi: abi,
        address: addresses[chain],
        functionName,
        args,
        chainId: chain,
      };
      const client = viemClients[chain];
      return await client.readContract(_call);
    },
    [activeChainID]
  );

  return { callContract };
};
