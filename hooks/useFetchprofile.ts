import { useCallback, useMemo } from "react";

import { NETWORKS } from "@/constants/web3/chains";
import { useDomainInfo } from "@/hooks/web3/useDomain";
import { fetchDomain } from "@/lib/api/domain";
import { getCurrentUser } from "@/lib/api/user";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  DomainInfoType,
  setDomainInfo,
  setInitiated,
  setOwnerStore,
  setProfile,
} from "@/store/slices/profile";

const useFetchProfile = (
  validDomain: string | null,
  chain: NETWORKS | null
) => {
  const dispatch = useAppDispatch();
  const {
    domain: storeDomain,
    chainId: storeChainId,
    domainInfo,
  } = useAppSelector((state) => state.profile);

  const domainOwner = useMemo(() => domainInfo?.owner ?? "", [domainInfo]);

  const { fetchDomainInfo } = useDomainInfo(validDomain ?? "", chain);

  const needUpdate = useMemo(
    () => storeDomain !== validDomain || chain !== storeChainId,
    [storeChainId, storeDomain, chain, validDomain]
  );

  const fetchDomainProfileByDB = useCallback(
    async (domainInfo?: DomainInfoType) => {
      const data = {
        chainId: chain as NETWORKS,
        domainName: validDomain ?? "",
      };

      const { data: domainData } = await fetchDomain(data, domainInfo);
      if (domainData) {
        const profile = {
          ...domainData,
          createdAt: domainData.createdAt,
        };
        dispatch(setProfile(profile));
      }
    },
    [chain, validDomain]
  );

  const fetchDomainInfoByContract = useCallback(async () => {
    dispatch(setInitiated({ key: "info", value: false }));
    const domainInfo = await fetchDomainInfo();
    if (domainInfo) {
      dispatch(setDomainInfo(domainInfo));
      return domainInfo;
    }
    return null;
  }, [fetchDomainInfo]);

  const fetchOwnerStore = useCallback(async () => {
    if (domainOwner) {
      dispatch(setInitiated({ key: "info", value: false }));
      const ownerStore = await getCurrentUser(domainOwner);
      if (ownerStore) {
        dispatch(
          setOwnerStore({
            ...ownerStore,
            dateJoined: ownerStore.dateJoined.toString(),
          })
        );
      }
    }
  }, [domainOwner]);

  return {
    domainOwner,
    needUpdate,
    fetchOwnerStore,
    fetchDomainProfileByDB,
    fetchDomainInfoByContract,
  };
};

export default useFetchProfile;
