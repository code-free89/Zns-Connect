"use client";
import { useUserDomainData } from "@/hooks/web3/useUserDomainData";
import useAuth from "@/lib/auth/useAuth";
import { useAppDispatch } from "@/store";
import { setLoading, setUserDomainData } from "@/store/slices/user-domains";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

export const useFetchUserDomain = () => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const address = useMemo(() => user?.address, [user]);
  const { fetchUserDomainData } = useUserDomainData(address ?? "");

  const { data: userDomainData } = useQuery({
    queryKey: ["publicUserDomainData", user?.address],
    queryFn: async () => {
      setLoading(true);
      const userDomainData = await fetchUserDomainData();
      setLoading(false);
      return userDomainData;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Update Redux store with fetched user Domains Data
  useEffect(() => {
    dispatch(setUserDomainData(userDomainData ?? null));
  }, [userDomainData]);

  return null;
};
