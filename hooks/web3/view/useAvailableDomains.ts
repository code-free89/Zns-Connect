import { useEffect, useState } from "react";

import { CONTRACTS } from "@/constants/web3/contracts";
import { RegisterDomainType } from "@/lib/model/domain";
import { ReturnContractType, useNetworksCall } from "../core/useNetworksCall";

export const useAvailableDomains = (
  domainName: string,
  onlyMainnet?: boolean
) => {
  const [availableDomains, setAvailableDomains] = useState<
    ReturnContractType<RegisterDomainType>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const { callContract: checkDomainAvailable } =
    useNetworksCall<RegisterDomainType>({
      contract: CONTRACTS.REGISTRY,
      functionName: "registryLookupByName",
      args: [domainName],
      onlyMainnet,
    });

  const debouncedCheckDomain = async () => {
    const data = await checkDomainAvailable();
    const filteredData = data.filter(
      (item) => item.data !== null
    ) as ReturnContractType<RegisterDomainType>[];
    setAvailableDomains(filteredData);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      if (domainName === "") return;
      setIsLoading(true);
      debouncedCheckDomain();
    })();
  }, [domainName]);

  return { isLoading, availableDomains };
};
