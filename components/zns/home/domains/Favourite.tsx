import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DomainItem from "@/components/zns/DomainItem";
import DomainTypeSelect from "@/components/zns/DomainTypeSelect";
import { fontStyles } from "@/constants/fonts";
import { SearchIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";

const NoFavourite = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Favourite is empty</Text>
      <View style={styles.searchContainer}>
        <SearchIcon color={CustomDarkTheme.colors.body} />
      </View>
      <Text style={styles.emptyDescription}>
        {"Get started by adding a\ndomain to favourite"}
      </Text>
    </View>
  );
};

export const FavouriteDomains = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<NETWORKS>();
  const { favourites } = useAppSelector((state) => state.setting);
  const filteredFavourites = useMemo(() => {
    if (selectedNetwork) {
      return favourites?.filter((domain) => domain.chainId === selectedNetwork);
    }
    return favourites;
  }, [favourites, selectedNetwork]);

  return (
    <View style={styles.container}>
      <DomainTypeSelect value={selectedNetwork} onSelect={setSelectedNetwork} />
      <View style={{ gap: getHeightSize(20), marginTop: 24 }}>
        {filteredFavourites?.length ? (
          filteredFavourites.map((domain, index) => (
            <DomainItem
              key={index}
              index={index + 1}
              domainName={domain.domainName}
              showCart={true}
              showChainSelect={false}
            />
          ))
        ) : (
          <NoFavourite />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: getHeightSize(20),
  },
  emptyContainer: {
    marginVertical: getHeightSize(32),
    alignItems: "center",
    gap: getHeightSize(16),
  },
  emptyTitle: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.body,
    fontSize: getHeightSize(18),
    lineHeight: getHeightSize(18 * 1.5),
  },
  emptyDescription: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.body,
    fontSize: getHeightSize(16),
    letterSpacing: 0.32,
    textAlign: "center",
  },
  searchContainer: {
    borderRadius: 9999,
    borderWidth: getHeightSize(12),
    borderColor: "#1A1A1ABA",
    backgroundColor: "#1A1A1A",
    padding: getHeightSize(8),
  },
});
