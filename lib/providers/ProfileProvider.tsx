import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useDebouncedCall } from "@/hooks/useDebouncedCall";
import useFetchProfile from "@/hooks/useFetchprofile";
import { useValidDomain } from "@/hooks/useValidDomain";
import { useUserDomainData } from "@/hooks/web3/useUserDomainData";
import { useAppDispatch } from "@/store";
import { useHIPUpdater } from "@/store/hooks/useHIPUpdater";
import { setInitiated, setOwnDomainData } from "@/store/slices/profile";
import { setDomainData } from "@/store/slices/profile";
import { useFetchUser } from "@/store/hooks/useUserUpdater";
import { NETWORKS } from "@/constants/web3/chains";
import { initProfileStore } from "@/store/slices/profile";

type ProfileProviderProps = {
  domain: string;
};

export default function ProfileProvider({ domain }: ProfileProviderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isValid, domain: validDomain, chain, tld } = useValidDomain(domain);
  const {
    domainOwner,
    needUpdate,
    fetchOwnerStore,
    fetchDomainProfileByDB,
    fetchDomainInfoByContract,
  } = useFetchProfile(validDomain, chain);
  const { address } = useAccount();
  const { fetchUserDomainData } = useUserDomainData(domainOwner);
  const { updateFollowingData } = useFetchUser();
  const { fetchHIPData } = useHIPUpdater();

  // ProfileDomainData
  const debouncedDomainData = useDebouncedCall(async () => {
    const data = {
      chainId: chain as NETWORKS,
      domain: validDomain ?? "",
      tld: tld ?? "",
    };

    dispatch(initProfileStore());
    const domainInfo = await fetchDomainInfoByContract();
    if (
      domainInfo?.owner &&
      domainInfo?.owner != "0x0000000000000000000000000000000000000000"
    ) {
      dispatch(setDomainData(data));
      dispatch(setInitiated({ key: "profile", value: false }));
      fetchDomainProfileByDB(domainInfo);

      await fetchHIPData(domainInfo.owner);
    }
  });

  useEffect(() => {
    return () => {
      dispatch(initProfileStore());
    };
  }, []);

  const debouncedHIPData = useDebouncedCall(async () => {
    if (address) {
      await fetchHIPData(address);
    }
  });

  useEffect(() => {
    debouncedHIPData();
  }, [address]);

  useEffect(() => {
    if (isValid && needUpdate) {
      debouncedDomainData();
    } else {
      if (!isValid) {
        dispatch(initProfileStore());
        // router.replace("/+not-found");
      }
    }
  }, [isValid, needUpdate, domain, router]);

  // Fetch User Following Data
  const debouncedFollowingData = useDebouncedCall(updateFollowingData);

  useEffect(() => {
    debouncedFollowingData();
  }, [updateFollowingData]);

  // Fetch User Following Data
  const debouncedFetchOwnerStore = useDebouncedCall(fetchOwnerStore);

  useEffect(() => {
    debouncedFetchOwnerStore();
  }, [fetchOwnerStore]);

  // Fetch Profile Owner Domains
  const debouncedUserDomainData = useDebouncedCall(async () => {
    dispatch(setInitiated({ key: "ownerDomains", value: false }));
    const data = await fetchUserDomainData();
    if (data) {
      dispatch(setOwnDomainData(data));
    }
  });

  useEffect(() => {
    debouncedUserDomainData();
  }, [fetchUserDomainData]);

  return null;
}
