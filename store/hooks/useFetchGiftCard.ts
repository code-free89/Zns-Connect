import { useCallback } from "react";
import { useAccount } from "wagmi";
import { useAppDispatch } from "@/store";
import { setGiftCards } from "@/store/slices/user";

import useLookupGiftCard from "@/hooks/web3/view/useLookupGiftCard";

export const useFetchGiftCard = () => {
  const dispatch = useAppDispatch();
  const { address, chainId } = useAccount();
  const { fetchUserGiftsCards } = useLookupGiftCard();

  const updateStoreGift = useCallback(async () => {
    if (address && chainId) {
      const giftCards = await fetchUserGiftsCards();
      if (giftCards) dispatch(setGiftCards(giftCards));
    } else {
      dispatch(setGiftCards([]));
    }
  }, [address, chainId, fetchUserGiftsCards]);

  return { updateStoreGift };
};
