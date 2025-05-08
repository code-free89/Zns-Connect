import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

import { getChainByID, isChainSupported } from "@/constants/web3/chains";
import { followDomain } from "@/lib/api/domain/profile";
import { useAppDispatch, useAppSelector } from "@/store";
import useFetchProfile from "@/store/hooks/useFetchProfile";
import { setFollow } from "@/store/slices/user";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export const useFollow = (
  domainId?: string,
  domainName: string = "",
  isNeedUpdateProfile = false,
  isOwner = false
) => {
  const dispatch = useAppDispatch();
  const { user, userDomainConfig, userPrimaryDomainDB, followingByUser } =
    useAppSelector((state) => state.user);
  const { chainId: userChainId } = useAccount();
  const { domain, chainId } = useAppSelector((state) => state.profile);

  const { fetchDomainProfileByDB } = useFetchProfile(domain, chainId);

  const [isProcessing, setIsProcessing] = useState(false);

  const { open } = useAppKit();

  const handleFollow = async (mode: "follow" | "unfollow") => {
    if (isProcessing) return;
    if (!user?.id) {
      open && open();
      return;
    }
    if (domainId) {
      if (userPrimaryDomainDB && userDomainConfig?.primaryDomain) {
        setIsProcessing(true);
        const res = await followDomain(
          domainId,
          userPrimaryDomainDB.id,
          isOwner
        );
        if (res.data) {
          if (isNeedUpdateProfile) fetchDomainProfileByDB();
          const message =
            mode === "follow"
              ? `You followed ${domainName}`
              : `You unfollowed ${domainName}`;
          showSuccessToast(message);
          dispatch(
            setFollow({ to: domainId, from: userPrimaryDomainDB?.id, mode })
          );
        }
        setIsProcessing(false);
      } else {
        if (isChainSupported(userChainId ?? 0) && userChainId) {
          const chainName = getChainByID(userChainId).shortName;
          showErrorToast(`You don't have any domain in ${chainName}`);
        } else {
          showErrorToast(
            "You don't have any domain in current network. Change the Network"
          );
        }
      }
    }
  };

  const isFollowed = useMemo(
    () =>
      (followingByUser?.findIndex((item) => item.toId === domainId) ?? -1) > -1,
    [followingByUser, domainId]
  );

  return { handleFollow, isProcessing, isFollowed };
};
