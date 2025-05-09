import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useMemo } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { HeartIcon, HeartIconFill } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainColor, getChainIcon } from "@/constants/web3/chains";
import useFavourite from "@/hooks/useFavourite";
import { useTLD } from "@/hooks/web3/useTLD";
import { RecentDomainType } from "@/store/slices/recents";
import { formatPrice } from "@/utils/formatter";
import { getHeightSize, getWidthSize } from "@/utils/size";

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
  const chainIcon = useMemo(() => getChainIcon(chainId), [chainId]);

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
        {isFavourite ? <HeartIconFill /> : <HeartIcon />}
      </Pressable>
      <Image source={chainIcon} style={styles.icon} />
      <Text style={styles.name}>
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
    gap: getWidthSize(6),
    padding: getWidthSize(12),
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  icon: {
    width: getWidthSize(24),
    height: getHeightSize(24),
    borderRadius: 9999,
  },
  name: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(18),
    color: "white",
  },
  price: {
    flex: 1,
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "right",
  },
});
