import { useCallback } from "react";
import { useAccount, useWriteContract as useWagmiWriteContract } from "wagmi";
import { CONTRACT_DATA_HIP } from "@/constants/web3/contracts";
import { NETWORKS, isChainSupported } from "@/constants/web3/chains";
import { UseContractHIPType } from "@/hooks/web3/core/type";
import { HIP_ABI } from "@/constants/web3/abis";

export const useWriteContractHIP = () => {
  const { chainId: activeChainID } = useAccount();

  const { data, error, isPending, isError, isSuccess, reset, writeContract } =
    useWagmiWriteContract();

  const callWriteContractHIP = useCallback(
    async (
      call: Omit<UseContractHIPType, "chainId">,
      price: bigint,
      chainId?: NETWORKS,
      referral?: string
    ) => {
      const chain = (chainId ? chainId : activeChainID) as NETWORKS;
      if (!isChainSupported(chain) || chain !== NETWORKS.INKMAINNET) {
        console.error("Not supported Chain");
        return null;
      }

      const { contract, functionName, args } = call;
      const { addresses } = CONTRACT_DATA_HIP[contract];

      writeContract({
        abi: HIP_ABI,
        address: addresses[chain as keyof typeof addresses],
        functionName,
        value: price,
        args: [referral],
        chainId: chain,
      });
    },
    [writeContract, activeChainID]
  );

  return {
    data,
    reset,
    error,
    callWriteContractHIP,
    isPending,
    isError,
    isSuccess,
  };
};
