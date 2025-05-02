import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { getChainColor } from "@/constants/web3/chains";
import useFavourite from "@/hooks/useFavourite";
import { useTLD } from "@/hooks/web3/useTLD";
import { RecentDomainType } from "@/store/slices/recents";
import { formatPrice } from "@/utils/formatter";
import { fontStyles } from "@/constants/fonts";

export default function MintItem({
  chainId,
  domainName,
  price,
  symbol,
}: RecentDomainType) {
  const tld = useTLD(chainId);
  const fullDomain = useMemo(() => `${domainName}.${tld}`, [domainName, tld]);
  const domainData = useMemo(
    () => ({ domainName, chainId }),
    [domainName, chainId]
  );
  const { isFavourite, onFavourite } = useFavourite(domainData);
  const chainColor = useMemo(() => getChainColor(chainId), [chainId]);

  const goToDomainProfile = () => {
    router.push({
      pathname: `/(tabs)/profile`,
      params: {
        domain: fullDomain,
      },
    });
  };

  return (
    <Pressable style={styles.container} onPress={goToDomainProfile}>
      <Pressable onPress={onFavourite}>
        <AntDesign
          name={isFavourite ? "heart" : "hearto"}
          size={18}
          color={CustomDarkTheme.colors.primary}
        />
      </Pressable>
      <Text style={[fontStyles["Poppins-Medium"], styles.name]}>
        {domainName}
        <Text style={{ color: chainColor }}>.{tld}</Text>
      </Text>
      <Text style={[fontStyles["Poppins-SemiBold"], styles.price]}>
        {`${formatPrice(Number(price))} ${symbol}`}
      </Text>
      <AntDesign name="right" size={13} color={CustomDarkTheme.colors.p500} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 12,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  name: {
    fontSize: 14,
    color: "white",
  },
  price: {
    flex: 1,
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "right",
  },
});
