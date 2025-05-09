import { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import DomainItem from "@/components/zns/DomainItem";
import EmptySearchResult from "@/components/zns/register/EmptySearchResult";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useAvailableDomains } from "@/hooks/web3/view/useAvailableDomains";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";

export default function SearchResult() {
  const { searchResult } = useAppSelector((state) => state.recentMinted);
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
      <View style={styles.titleContainer}>
        <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
          Search Results For{"  "}
          <Text style={{ color: "#FFD640" }}>{domain}</Text>
        </Text>
      </View>
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
  },
  titleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#26262666",
    borderColor: "#C9FC0180",
    paddingVertical: getHeightSize(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: getHeightSize(15),
    marginBottom: getHeightSize(29),
  },
});
