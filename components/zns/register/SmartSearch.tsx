import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import DomainTypeSelect from "@/components/zns/DomainTypeSelect";
import RecentlyMinted from "@/components/zns/register/RecentlyMinted";
import SearchDomain from "@/components/zns/register/SearchDomain";
import SearchResult from "@/components/zns/register/SearchResult";
import { NETWORKS } from "@/constants/web3/chains";
import { AvailableDomainType } from "@/lib/model/domain";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearchResult } from "@/store/slices/recents";

export default function SmartSearch() {
  const dispatch = useAppDispatch();
  const [selectedNetwork, setSelectedNetwork] = useState<NETWORKS>();
  const { searchResult } = useAppSelector((state) => state.recentMinted);

  useEffect(() => {
    if (selectedNetwork && searchResult) {
      dispatch(setSearchResult({ ...searchResult, chain: selectedNetwork }));
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (searchResult) {
      setSelectedNetwork(searchResult.chain);
    }
  }, [searchResult]);

  const onDomainSelected = (item: AvailableDomainType) => {
    dispatch(setSearchResult(item));
  };

  return (
    <View style={styles.container}>
      <SearchDomain onSelectItem={onDomainSelected} />

      <DomainTypeSelect value={selectedNetwork} onSelect={setSelectedNetwork} />

      <SearchResult />

      <RecentlyMinted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
