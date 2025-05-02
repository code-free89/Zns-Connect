import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

import { isChainSupported, NETWORKS } from "@/constants/web3/chains";
import { useUserCredit } from "@/hooks/web3/view/useUserCredit";
import { useUserDomainInfo } from "@/hooks/web3/view/useUserDomainInfo";
import {
  fetchFollowByDomainId,
  fetchFollowersByDomain,
} from "@/lib/api/domain/follow";
import { getCurrentUser } from "@/lib/api/user";
import useAuth from "@/lib/auth/useAuth";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  setFollowData,
  setFollowersOfUser,
  setLoadingUser,
  setPDomainDB,
  setStoreUser,
  setUserCredit,
  setUserDomainInfo,
} from "@/store/slices/user";
import { UserDomainType } from "@/store/slices/user-domains";

export const useFetchUser = () => {
  const dispatch = useAppDispatch();

  const { userDomainConfig } = useAppSelector((state) => state.user);

  const updateFollowingData = useCallback(async () => {
    if (userDomainConfig?.primaryDomain) {
      dispatch(setLoadingUser({ key: "isLoadingFollowData", value: true }));
      const primaryId = userDomainConfig?.primaryDomain.toString();
      const followData = await fetchFollowByDomainId(primaryId);
      if (followData) {
        dispatch(setFollowData(followData));
      }
      dispatch(setLoadingUser({ key: "isLoadingFollowData", value: false }));
    }
  }, [userDomainConfig]);

  const updateFollowerOfUser = useCallback(
    async (userDomains: UserDomainType[]) => {
      if (userDomains && userDomains.length) {
        dispatch(
          setLoadingUser({ key: "isLoadingFollowerOfUserData", value: true })
        );
        const domainIds = userDomains.map((item) => item.domainId.toString());
        const followers = await fetchFollowersByDomain(domainIds);
        if (followers) {
          dispatch(setFollowersOfUser(followers));
        }
        dispatch(
          setLoadingUser({ key: "isLoadingFollowerOfUserData", value: false })
        );
      }
    },
    []
  );

  return {
    updateFollowingData,
    updateFollowerOfUser,
  };
};

const useUserUpdater = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { address, chainId } = useAccount();
  const { fetchUserCredit } = useUserCredit();

  const { fetchUserDomainInfo } = useUserDomainInfo(address);
  // Fetch User Primary Domain Contract Data
  const { data: userPrimaryContractData } = useQuery({
    queryKey: ["userPrimaryDomain", user?.address, chainId],
    queryFn: async () => {
      if (!!user?.address && isChainSupported(chainId ?? 0)) {
        dispatch(
          setLoadingUser({ key: "isLoadingPrimaryDomainContract", value: true })
        );
        try {
          const domainInfo = await fetchUserDomainInfo();
          if (domainInfo) {
            return domainInfo;
          }
        } catch (error) {
          console.error("Error fetching user primary domain data:", error);
          return null;
        }
      }
      return null;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    dispatch(
      setUserDomainInfo({
        userDomainConfig: userPrimaryContractData?.userDomainConfig,
        userPrimaryDomain: userPrimaryContractData?.userPrimaryDomain,
      })
    );
  }, [userPrimaryContractData]);
  /*
  // Fetch User Primary Domain DB Data
  const { data: userPrimaryDomainDBData } = useQuery({
    queryKey: [
      "userPrimaryDomainDB",
      user?.address,
      chainId,
      userPrimaryContractData?.userPrimaryDomain.domainName,
    ],
    queryFn: async () => {
      if (
        !!user?.address &&
        isChainSupported(chainId ?? 0) &&
        userPrimaryContractData?.userPrimaryDomain.domainName
      ) {
        const userPDomain = await getDomain(
          {
            domainName: userPrimaryContractData.userPrimaryDomain?.domainName,
            chainId: chainId as NETWORKS,
          },
          Number(userPrimaryContractData.userDomainConfig.primaryDomain)
        );
        if (userPDomain?.id) {
          return {
            ...userPDomain,
            createdAt: userPDomain.createdAt.toDateString(),
          };
        } else {
          return null;
        }
      }
      return null;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    dispatch(setPDomainDB(userPrimaryDomainDBData ?? undefined));
  }, [userPrimaryDomainDBData]);
*/
  // Fethcing User Credit
  const { data: userCreditCardData } = useQuery({
    queryKey: ["userCredit", address, chainId],
    queryFn: async () => {
      if (!!address && isChainSupported(chainId ?? 0)) {
        dispatch(setLoadingUser({ key: "isLoadingCreditData", value: true }));
        return await fetchUserCredit();
      } else {
        return 0;
      }
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Update Redux store with fetched credit data
  useEffect(() => {
    dispatch(setUserCredit(userCreditCardData ?? 0));
  }, [userCreditCardData]);

  // Fetching User DB Info
  const { data: userStoreData } = useQuery({
    queryKey: ["currentUserStore", user?.address],
    queryFn: async () => {
      if (user && user.address) {
        // Indicate loading state
        dispatch(setLoadingUser({ key: "isLoadingUserStore", value: true }));
        // Fetch user's information from the database
        const userDB = await getCurrentUser(user.address);

        if (userDB) {
          return userDB;
        }
      }
      return null;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Helper function to serialize user data
  const serializeUser = (userDB: any) => ({
    ...userDB,
    dateJoined: userDB.dateJoined.toDateString(),
  });

  // Update Redux store with fetched user data
  useEffect(() => {
    dispatch(setStoreUser(userStoreData ?? null));
  }, [userStoreData]);

  // Update Refer Code
  useEffect(() => {
    // if (user?.address) {
    //   const referCode = localStorage.getItem("refCode") ?? "";
    //   if (referCode) {
    //     updateReferCode(referCode);
    //   }
    // }
  }, [user?.address]);

  // const referCode = localStorage.getItem("refCode") ?? "";
};

export default useUserUpdater;
