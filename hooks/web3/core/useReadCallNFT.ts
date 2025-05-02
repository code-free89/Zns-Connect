import { useCallback } from "react";
import { useAccount } from "wagmi";

import { NFT_ABI } from "@/constants/web3/abis";
import { CONTRACTS_NFT, CONTRACT_DATA_NFT } from "@/constants/web3/contracts";
import { NFTS } from "@/constants/web3/nfts";
import { viemClients } from "@/utils/viem";

export const useReadCallNFTContract = () => {
  const { address } = useAccount();

  const callNFTContract = useCallback(async (nft_type: NFTS) => {
    if (!address) {
      console.error("No user address");
      return null;
    }

    const { addresses, chains } = CONTRACT_DATA_NFT[CONTRACTS_NFT.NFT];

    const _call = {
      abi: NFT_ABI,
      address: addresses[nft_type as keyof typeof addresses],
      functionName: "balanceOf",
      args: [address],
    };

    const client = viemClients[chains[nft_type as keyof typeof chains]];
    return await client.readContract(_call);
  }, []);

  return { callNFTContract };
};
