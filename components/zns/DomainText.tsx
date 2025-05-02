import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

import { getChainColor } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { fontStyles } from "@/constants/fonts";

type DomainTextProps = {
  domainName: string;
  chainId: number;
};

export default function DomainText({ domainName, chainId }: DomainTextProps) {
  const tld = useTLD(chainId);
  const chainColor = useMemo(() => getChainColor(chainId), [chainId]);

  return (
    <Text style={[fontStyles["Poppins-Medium"], styles.domainName]}>
      {domainName}
      <Text style={{ color: chainColor }}>.{tld}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  domainName: {
    fontSize: 14,
    color: "white",
  },
});
