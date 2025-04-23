import { useMemo } from "react";
import { useAccount } from "wagmi";

const useAuth = () => {
  const { address, isConnected } = useAccount();

  const isAuthorized = useMemo(
    () => isConnected && address,
    [isConnected, address]
  );

  return {
    isAuthorized,
    connectedWallet: address,
  };
};

export default useAuth;
