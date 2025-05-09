import { useMemo } from "react";
import { Image, ImageStyle, StyleProp, View } from "react-native";

import { CHAINS, isChainSupported, NETWORKS } from "@/constants/web3/chains";
import { getDomainUrl } from "@/utils/helpers";

type DomainAvatarProps = {
  chainId?: NETWORKS | null;
  domainId?: string;
  style?: StyleProp<ImageStyle>;
};

export default function DomainAvatar({
  chainId,
  domainId,
  style,
}: DomainAvatarProps) {
  const url = useMemo(
    () => getDomainUrl(chainId, domainId),
    [chainId, domainId]
  );
  const selectedChain = useMemo(
    () => CHAINS.find((c) => c.chain === chainId?.toString()),
    [chainId]
  );
  const isValid = useMemo(
    () => !!Number(domainId) && isChainSupported(selectedChain?.id ?? 0),
    [chainId, domainId]
  );

  return isValid ? (
    <Image source={selectedChain?.icon!} style={style} />
  ) : (
    <Image source={{ uri: url }} width={250} height={250} style={style} />
  );
}
