import { useEffect } from "react";

import { useCartData } from "@/hooks/web3/view/useDomainsOnStore";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCartDomains } from "@/store/slices/cart";
import { setPurchased } from "@/store/slices/setting";

export const CartProvider = () => {
  const dispatch = useAppDispatch();
  const isInited = useAppSelector((state) => state.setting.isInited);
  const { carts } = useAppSelector((state) => state.setting);
  const { fetchCartDomainDetail } = useCartData();

  useEffect(() => {
    (async () => {
      if (isInited) {
        dispatch(setPurchased(false));
        const data = await fetchCartDomainDetail();
        dispatch(setCartDomains(data));
      }
    })();
  }, [isInited, carts]);

  return null;
};
