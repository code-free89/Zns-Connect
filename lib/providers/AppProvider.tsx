import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import { isChainSupported } from "@/constants/web3/chains";
import { CartedDomain, FavouritedDomain } from "@/lib/model/domain";
import { useAppDispatch } from "@/store";
import { useFetchUserDomain } from "@/store/hooks/useFetchUserDomains";
import useUserUpdater from "@/store/hooks/useUserUpdater";
import { initByStorage } from "@/store/slices/setting";
import { setUserSession, UserSession } from "@/store/slices/user";

export default function AppProvider() {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useUserUpdater();
  useFetchUserDomain();

  // Update carts and favorites to store from localstorage.
  useEffect(() => {
    const initApp = async () => {
      const carts = JSON.parse(
        (await AsyncStorage.getItem("carts")) || "[]"
      ) as CartedDomain[];
      const favorites = JSON.parse(
        (await AsyncStorage.getItem("favorites")) || "[]"
      ) as FavouritedDomain[];
      // remove invalid localstorage Items
      const _carts = carts.filter(
        (item) => item.domainName && isChainSupported(item.chainId) && item.year
      );

      const _favorites = favorites.filter(
        (item) => item.domainName && isChainSupported(item.chainId)
      );

      const session = JSON.parse(
        (await AsyncStorage.getItem("session")) || "{}"
      ) as UserSession;

      if (session) {
        dispatch(setUserSession(session));
      }

      AsyncStorage.setItem("carts", JSON.stringify(_carts));
      AsyncStorage.setItem("favorites", JSON.stringify(_favorites));

      dispatch(
        initByStorage({
          carts: _carts,
          favourites: _favorites,
        })
      );
      setIsInitialized(true);
    };
    initApp();
  }, []);

  return <React.Fragment></React.Fragment>;
}
