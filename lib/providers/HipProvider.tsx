import { useEffect } from "react";
import { useAccount } from "wagmi";

import { useDebouncedCall } from "@/hooks/useDebouncedCall";
import { useHIPUpdater } from "@/store/hooks/useHIPUpdater";

export default function HIPProvider() {
  const { fetchHIPData } = useHIPUpdater();
  const { address } = useAccount();

  const debouncedHIPData = useDebouncedCall(async () => {
    if (address) await fetchHIPData(address);
  });

  useEffect(() => {
    if (address) {
      debouncedHIPData();
    }
  }, [address, debouncedHIPData]);

  return null;
}
