import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { getChainByChain } from "@/constants/web3/chains";
import { useDomainData } from "@/hooks/web3/view/useDomainsOnStore";
import { fetchRecentMintedDomain } from "@/lib/api/domain";
import { fetchDomainCategories } from "@/lib/api/domain/category";
import { Domain } from "@/lib/model/domain";
import { useAppDispatch } from "@/store";
import {
  setDomainCategories,
  setDomainCategoryLoading,
} from "@/store/slices/category";
import { setDomains, setLoading } from "@/store/slices/recents";

export default function DomainProvider() {
  const dispatch = useAppDispatch();
  const { fetchDomainDetail } = useDomainData();

  useQuery({
    queryKey: ["fetchRecentMintedDomain"],
    queryFn: async () => {
      dispatch(setLoading(true));

      const domains = (await fetchRecentMintedDomain()) ?? [];
      const serializedDomains = domains.map((domain: any) => {
        const chain = getChainByChain(domain.chain);
        return { chainId: chain.id, domainName: domain.domainName } as Domain;
      });
      const data = await fetchDomainDetail(serializedDomains);
      dispatch(setDomains(data));
      dispatch(setLoading(false));
      return null;
    },
    staleTime: 60000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // fetch domain categories
  const [fetchDomainCategoriesTrigger, setFetchDomainCategoriesTrigger] =
    useState(false);
  useEffect(() => {
    loadDomainCategories();

    const timerId = setTimeout(() => {
      setFetchDomainCategoriesTrigger((prev) => !prev);
    }, 5 * 1000);

    return () => clearTimeout(timerId);
  }, [fetchDomainCategoriesTrigger]);

  const loadDomainCategories = async () => {
    dispatch(setDomainCategoryLoading(true));
    const domainCategories = (await fetchDomainCategories()) ?? [];
    dispatch(setDomainCategories(domainCategories));
    dispatch(setDomainCategoryLoading(false));
  };

  return null;
}
