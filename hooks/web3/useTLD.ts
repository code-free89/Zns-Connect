import { useMemo } from "react";

import { NETWORKS } from "@/constants/web3/chains";
import { tlds } from "@/constants/web3/tlds";

export const useTLD = (chainId?: NETWORKS | string) => {
  return useMemo(() => {
    return (
      tlds.find((tld) => tld.chainId === (chainId as NETWORKS))?.label ?? ""
    );
  }, [chainId]);
};
