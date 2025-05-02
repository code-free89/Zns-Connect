import { useMemo } from "react";

import { Domain } from "@/lib/model/domain";
import { useAppDispatch, useAppSelector } from "@/store";
import { removeFavoriteDomain } from "@/store/slices/favorite";
import { favouriteDomain } from "@/store/slices/setting";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

const useFavourite = (domain: Domain | null) => {
  const dispatch = useAppDispatch();

  const { favourites } = useAppSelector((state) => state.setting);

  const isFavourite = useMemo(
    () =>
      favourites.filter(
        (item) =>
          item.domainName === domain?.domainName &&
          item.chainId === domain?.chainId
      ).length !== 0,
    [favourites, domain]
  );

  const onFavourite = () => {
    if (!domain) return;
    if (!isFavourite) {
      showSuccessToast("Added to your favorites");
    } else {
      showErrorToast("Removed from your favorites");
    }
    dispatch(favouriteDomain(domain));
    dispatch(removeFavoriteDomain(domain));
  };

  return { isFavourite, onFavourite };
};

export default useFavourite;
