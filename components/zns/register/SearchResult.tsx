import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MintItem from "@/components/zns/MintItem";
import EmptySearchResult from "@/components/zns/register/EmptySearchResult";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAvailableDomains } from "@/hooks/web3/view/useAvailableDomains";
import { useAppSelector } from "@/store";
import DomainItem from "../DomainItem";

export default function SearchResult() {
  const { searchResult } = useAppSelector((state) => state.recentMinted);
  const tld = useTLD(searchResult?.chain ?? "");
  const { chain, domain } = searchResult ?? { chain: "", domain: "" };
  const { availableDomains, isLoading } = useAvailableDomains(domain);

  const domains = useMemo(() => {
    const chainOrder = Object.values(NETWORKS);

    const filteredDomains = chain
      ? availableDomains.filter(
          (domain) => domain.chainId.toString() === chain.toString()
        )
      : availableDomains;

    return filteredDomains.sort(
      (a, b) => chainOrder.indexOf(a.chainId) - chainOrder.indexOf(b.chainId)
    );
  }, [availableDomains, chain]);

  return searchResult ? (
    <View>
      <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
        Search Results For{"  "}
        <Text style={{ color: "#FFD640" }}>.{tld}</Text>
      </Text>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={CustomDarkTheme.colors.primary}
        />
      ) : (
        domains.map((item, index) => {
          return (
            <DomainItem
              key={index}
              index={index + 1}
              domainName={domain}
              chainId={item.chainId}
              showCart
            />
          );
        })
      )}
    </View>
  ) : (
    <EmptySearchResult />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.txtColor,
    marginBottom: 12,
  },
});
