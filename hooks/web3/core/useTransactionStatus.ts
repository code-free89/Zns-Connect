import { useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";
import { showSuccessToast } from "@/utils/toast";

export const useTransactionStatus = (
  hash: `0x${string}` | undefined,
  successMessage: string,
  successCallback: () => void,
  reset: () => void
) => {
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast(successMessage);
      reset();
      if (successCallback) successCallback();
    }
  }, [isSuccess]);

  return { isLoading };
};
