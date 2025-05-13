import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import DomainTypeItem from "@/components/zns/DomainTypeItem";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAIN_IDS, mainnets, NETWORKS } from "@/constants/web3/chains";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type DomainTypeSelectProps = {
  chains?: NETWORKS[];
  chainData?: { chainId: NETWORKS; data: number | string }[];
  value?: NETWORKS;
  onSelect?: (chainId: NETWORKS) => void;
  onNetworkSelect?: (network: "mainnet" | "testnet", inside: boolean) => void;
  noNetworkFilter?: boolean;
};

export default function DomainTypeSelect({
  chains,
  chainData,
  value,
  onSelect,
  onNetworkSelect,
  noNetworkFilter,
}: DomainTypeSelectProps) {
  const [isMainnet, setIsMainnet] = useState<boolean>(true);
  const networks = useMemo(() => (chains ? chains : CHAIN_IDS), [chains]);
  const handleSwitchChange = (newState: boolean, inside = false) => {
    if (newState) {
      onNetworkSelect && onNetworkSelect("mainnet", inside);
    } else {
      onNetworkSelect && onNetworkSelect("testnet", inside);
    }
    setIsMainnet(newState);
  };

  useEffect(() => {
    if (value && CHAIN_IDS.includes(value) && !noNetworkFilter) {
      const isMainnetBySelected = mainnets.includes(value);
      if (isMainnetBySelected !== isMainnet) {
        handleSwitchChange(isMainnetBySelected, true);
      }
    }
  }, [value]);

  const onChainSelect = (chainId: NETWORKS) => {
    onSelect && onSelect(chainId);
  };

  const processedNetworks = useMemo(() => {
    const chainOrder = Object.values(NETWORKS);

    const filteredNetworks = noNetworkFilter
      ? networks
      : networks.filter((item) => isMainnet === mainnets.includes(item));

    return filteredNetworks.sort(
      (a, b) => chainOrder.indexOf(a) - chainOrder.indexOf(b)
    );
  }, [networks, noNetworkFilter, isMainnet]);

  // const getChainData = (chainId: NETWORKS) => {
  //   const chainInfo = _.find(chainData, { chainId });
  //   return chainInfo ? chainInfo.data : 0;
  // };

  return processedNetworks.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "column", gap: getHeightSize(8) }}
    >
      {chainData && chainData.length > 0 ? (
        <View style={{ flexDirection: "row", gap: getWidthSize(8) }}>
          {processedNetworks.map((item, index) => (
            <DomainTypeItem
              key={item}
              chainId={item}
              isSelected={value === item}
              onPress={() => onChainSelect(item)}
            />
          ))}
        </View>
      ) : (
        <React.Fragment>
          <View style={{ flexDirection: "row", gap: getWidthSize(8) }}>
            {processedNetworks.map((item, index) =>
              index % 2 == 0 ? (
                <DomainTypeItem
                  key={item}
                  chainId={item}
                  isSelected={value === item}
                  onPress={() => onChainSelect(item)}
                />
              ) : null
            )}
          </View>
          <View style={{ flexDirection: "row", gap: getWidthSize(8) }}>
            {processedNetworks.map((item, index) =>
              index % 2 == 1 ? (
                <DomainTypeItem
                  key={item}
                  chainId={item}
                  isSelected={value === item}
                  onPress={() => onChainSelect(item)}
                />
              ) : null
            )}
          </View>
        </React.Fragment>
      )}
    </ScrollView>
  ) : (
    <Text style={styles.noNetwork}>No networks found</Text>
  );
}

const styles = StyleSheet.create({
  noNetwork: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
