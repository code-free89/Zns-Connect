import { useCallback } from "react";
import { useAccount } from "wagmi";

import { HIP_ABI } from "@/constants/web3/abis";
import { NETWORKS, isChainSupported } from "@/constants/web3/chains";
import { CONTRACT_DATA_HIP } from "@/constants/web3/contracts";
import { UseContractHIPType } from "@/hooks/web3/core/type";
import { viemClients } from "@/utils/viem";

export const useReadHIPContract = () => {
  const { chainId: activeChainID } = useAccount();

  const callHIPContract = useCallback(
    async (call: Omit<UseContractHIPType, "chainId">, chainId?: NETWORKS) => {
      const chain = (chainId ? chainId : activeChainID) as NETWORKS;
      if (!chain || !isChainSupported(chain) || chain !== NETWORKS.INKMAINNET) {
        console.error("Not supported Chain");

        return null;
      }

      const { contract, functionName, args } = call;
      const { addresses } = CONTRACT_DATA_HIP[contract];
      const _call = {
        abi: HIP_ABI,
        address: addresses[chain as keyof typeof addresses],
        functionName,
        args,
        chainId: chain,
      };
      const client = viemClients[chain];
      return await client.readContract(_call);
    },
    [activeChainID]
  );

  return { callHIPContract };
};
