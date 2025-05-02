import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

import { RootState } from "@/store";

export type AuthenticationStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated";

const useAuth = () => {
  const { address, isConnected } = useAccount();
  const { session } = useSelector((state: RootState) => state.user);

  const status = useMemo(
    () => (session?.address ? "authenticated" : "unauthenticated"),
    [session]
  );
  const isAuthorized = useMemo(
    () => isConnected && address && session?.address === address,
    [isConnected, address, session]
  );

  const isNeedToResign = useMemo(() => {
    if (isConnected) {
      if (!session?.address || (address && session?.address !== address)) {
        return true;
      }
    } else {
      return false;
    }
  }, [isConnected, session, address]);

  return {
    isAuthorized,
    isNeedToResign,
    status: status as AuthenticationStatus,
    user: session,
    connectedWallet: address,
  };
};

export default useAuth;
