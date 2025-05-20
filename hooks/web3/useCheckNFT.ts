import { useEffect, useState } from "react";

import { NFTS } from "@/constants/web3/nfts";
import { useReadCallNFTContract } from "@/hooks/web3/core/useReadCallNFT";
import { showErrorToast } from "@/utils/toast";

export const useCheckBalanceNFT = (
  nft_type: NFTS,
  successCallback?: () => void
) => {
  const { callNFTContract } = useReadCallNFTContract();
  const [hasNFT, setHasNFT] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const balance = await callNFTContract(nft_type);
        const hasBalance = balance && Number(balance) > 0;
        setHasNFT(!!hasBalance);
        if (hasBalance && successCallback) {
          successCallback();
        }
      } catch (error) {
        console.error("Error checking NFT balance:", error);
        showErrorToast("Failed to check NFT balance");
      }
    };
    getBalance();
  }, [nft_type, callNFTContract, successCallback]);

  return { hasNFT };
};
