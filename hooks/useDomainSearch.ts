import { useMemo } from "react";

import { CHAINS, getChainColor, mainnets } from "@/constants/web3/chains";
import { tlds } from "@/constants/web3/tlds";
import { useAvailableDomains } from "@/hooks/web3/view/useAvailableDomains";
import { toDomainUrl } from "@/utils/formatter";

type DomainSearchProps = {
  searchInputText: string;
};

export default function useDomainSearch({
  searchInputText,
}: DomainSearchProps) {
  const searchedDomain = useMemo(() => {
    return toDomainUrl(searchInputText);
  }, [searchInputText]);

  const { isLoading, availableDomains } = useAvailableDomains(
    searchedDomain,
    true
  );

  const options = useMemo(() => {
    return !!searchedDomain
      ? mainnets.map((chain) => {
          const domain = availableDomains.find(
            (domain) => domain.chainId === chain
          );
          const tld = tlds.find((tld) => tld.chainId === chain)?.label;
          const chainColor = getChainColor(chain);
          const icon = CHAINS.find((c) => c.id === chain)?.icon ?? "";

          return {
            label: `${searchedDomain}.${tld}`,
            domain: searchedDomain,
            tld,
            chain: chain,
            status: !domain?.data.domainName,
            color: chainColor,
            icon,
          };
        })
      : [];
  }, [searchedDomain, availableDomains]);

  return {
    options,
    isLoading,
    searchInputText,
    searchedDomain,
  };
}
