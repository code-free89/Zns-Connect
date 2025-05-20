import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { CONTRACTS_HIP } from "@/constants/web3/contracts";
import { useReadHIPContract } from "@/hooks/web3/core/useReadCallHIP";
import { useTransactionStatus } from "@/hooks/web3/core/useTransactionStatus";
import { useWriteContractHIP } from "@/hooks/web3/core/useWriteContractHIP";
import { updateHIPReferral } from "@/lib/api/hip";
import { useAppSelector } from "@/store";
import { showErrorToast } from "@/utils/toast";

export const useCheckoutHIP = (successCallback?: () => void) => {
  const { user } = useAppSelector((state) => state.user);
  const { address, chainId } = useAccount();

  const defaultAddressReferralHIP =
    process.env.NEXT_PUBLIC_DEFAULT_ADDRESS_REFERRAL_HIP!;

  const refer = useMemo(() => {
    if (!user || user.refer === address || !user.refer) {
      return defaultAddressReferralHIP;
    }
    return user.refer ?? defaultAddressReferralHIP;
  }, [user, address]);

  const getMintPriceCall = useMemo(
    () => ({
      contract: CONTRACTS_HIP.HIP,
      functionName: "getMintPrice",
    }),
    []
  );

  const getSafeMintCall = useMemo(
    () => ({
      contract: CONTRACTS_HIP.HIP,
      functionName: "safeMintWithReferral",
    }),
    []
  );

  const { callHIPContract } = useReadHIPContract();

  const {
    data: hash,
    error,
    isPending,
    isError,
    reset,
    callWriteContractHIP,
  } = useWriteContractHIP();

  const [mintPrice, setMintPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const getMintPrice = async () => {
      const data = await callHIPContract(getMintPriceCall, chainId);
      const _price = (!!data ? data : BigInt(0)) as bigint;
      setMintPrice(_price);
    };
    getMintPrice();
  }, [chainId]);

  const { isLoading } = useTransactionStatus(
    hash,
    "Mint HIP successfully",
    successCallback
      ? () => {
          updateHIPReferral(refer, mintPrice);
          successCallback();
        }
      : () => {},
    reset
  );

  const isProcessing = useMemo(
    () => (isLoading && !!hash) || isPending,
    [isLoading, hash, isPending]
  );

  const { data: userBalance } = useBalance({ address });
  // const { value: costWithGas } = useCostWithGas(
  //   getSafeMintCall,
  //   NETWORKS.INKMAINNET
  // );
  const isEnoughBalance = useMemo(() => {
    // if (costWithGas) {
    //   return userBalance && userBalance?.value >= Number(costWithGas);
    // }
    return userBalance && userBalance?.value >= mintPrice;
  }, [userBalance, mintPrice]);

  useEffect(() => {
    if (isError) {
      console.error("Error : ", error);
      showErrorToast(`Transaction has canceled`);
    }
  }, [isError, error]);

  const onCheckoutHIP = useCallback(async () => {
    if (!address) {
      showErrorToast("Please connect your wallet");
      return;
    }

    if (chainId) {
      if (!chainId) return BigInt(0);
      const data = await callHIPContract(getMintPriceCall, chainId);
      const _price = (!!data ? data : BigInt(0)) as bigint;

      if (isEnoughBalance) {
        callWriteContractHIP(getSafeMintCall, _price, chainId, refer);
      }
    }
  }, [address, callWriteContractHIP, chainId, isEnoughBalance, refer]);

  return {
    isEnoughBalance,
    isProcessing,
    onCheckoutHIP,
  };
};
