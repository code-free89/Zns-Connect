import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useAccount } from "wagmi";

import { fetchFollowersByDomain } from "@/lib/api/domain/follow";
import { useAppDispatch, useAppSelector } from "@/store";
import { setBadgeDataLoading } from "@/store/slices/badges";
import { setFollowersOfUser, setLoadingUser } from "@/store/slices/user";

export default function BadgeProvider() {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { domains } = useAppSelector((state) => state.userDomains);

  const fetchFollowData = useCallback(async () => {
    if (!domains) {
      dispatch(setBadgeDataLoading(false));
      return null;
    }
    let followers = null;
    dispatch(setBadgeDataLoading(true));
    dispatch(
      setLoadingUser({ key: "isLoadingFollowerOfUserData", value: true })
    );

    try {
      const domainIds = domains.map((item) => item.domainId.toString());
      followers = await fetchFollowersByDomain(domainIds);
    } finally {
      dispatch(
        setLoadingUser({ key: "isLoadingFollowerOfUserData", value: false })
      );
      dispatch(setBadgeDataLoading(false));
      return followers;
    }
  }, [dispatch, domains]);

  const { data: followData } = useQuery({
    queryKey: ["publicBadgeData", domains, address],
    queryFn: fetchFollowData,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    dispatch(setFollowersOfUser(followData ?? null));
  }, [followData, dispatch]);

  return null;
}
