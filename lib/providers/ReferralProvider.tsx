import { useEffect } from "react";
import { useAccount } from "wagmi";

import { isChainSupported, NETWORKS } from "@/constants/web3/chains";
import { useDebouncedCall } from "@/hooks/useDebouncedCall";
import { getReferrals } from "@/lib/api/referral";
import { useAppDispatch } from "@/store";
import {
  initReferrals,
  setReferralInfo,
  setLoading as setReferralLoading,
  setReferralsLead,
  setReferralsMy,
} from "@/store/slices/referral";

export default function ReferralProvider() {
  const { chainId, address } = useAccount();
  const dispatch = useAppDispatch();

  const debouncedFetchFollowingData = useDebouncedCall(async () => {
    if (chainId) {
      const data = await getReferrals(chainId as NETWORKS, address);
      dispatch(setReferralsLead(data.lead));
      dispatch(setReferralsMy(data.my));
      dispatch(
        setReferralInfo({
          totalEarnings: data.totalEarnings,
          numberOfReferrals: data.numberOfReferrals,
        })
      );
      dispatch(setReferralLoading(false));
    }
  });

  useEffect(() => {
    if (chainId && isChainSupported(chainId)) {
      dispatch(setReferralLoading(true));
      debouncedFetchFollowingData();
    } else {
      dispatch(initReferrals());
    }
  }, [chainId]);

  return null;
}
