import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { getChainColor } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { getHeightSize } from "@/utils/size";

type DomainTextProps = {
  domainName: string;
  chainId: number;
};

export default function DomainText({ domainName, chainId }: DomainTextProps) {
  const tld = useTLD(chainId);
  const chainColor = useMemo(() => getChainColor(chainId), [chainId]);

  return (
    <Text style={styles.domainName}>
      {domainName}
      <Text style={{ color: chainColor }}>.{tld}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  domainName: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(24),
    color: "white",
  },
});
