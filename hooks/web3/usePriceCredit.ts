import { useEffect, useMemo, useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { CONTRACTS } from "@/constants/web3/contracts";
import { useReadCall } from "@/hooks/web3/core/useReadCall";

const usePriceCredit = () => {
  const [priceInUSD, setPriceInUSD] = useState(0);
  const { chainId } = useAccount();

  const call = useMemo(
    () => ({
      contract: CONTRACTS.REGISTRY,
      functionName: "getOraclePrice",
    }),
    []
  );

  const { callContract } = useReadCall();

  useEffect(() => {
    (async () => {
      if (chainId) {
        const data = await callContract(call, chainId);
        const _price = (!!data ? data : BigInt(0)) as bigint;
        const creaditNumber = Number(formatEther(_price));

        setPriceInUSD(creaditNumber);
      }
    })();
  }, [chainId]);

  return { priceInUSD };
};

export default usePriceCredit;
