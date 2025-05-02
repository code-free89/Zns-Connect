import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
// import useAuth from "@/lib/auth/useAuth";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();
  // const { user } = useAuth();
  const { chainId, address } = useAccount();

  const invalidateCredit = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["userCredit", address, chainId],
    });
  }, [queryClient, chainId]);

  const invalidateUserPDomain = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["userPrimaryDomain", address, chainId],
    });
  }, [queryClient, chainId]);

  const invalidateUserStore = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["currentUserStore", address],
    });
  }, [queryClient]);

  const invalidateUserDomains = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["publicUserDomainData", address],
    });
  }, [queryClient]);

  return {
    invalidateCredit,
    invalidateUserStore,
    invalidateUserPDomain,
    invalidateUserDomains,
  };
};
