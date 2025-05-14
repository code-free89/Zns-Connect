import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import BadgeLoader from "@/components/zns/BadgeLoader";
import DomainText from "@/components/zns/DomainText";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS } from "@/constants/web3/chains";
import useDomainSearch from "@/hooks/useDomainSearch";
import { getHeightSize, getWidthSize } from "@/utils/size";
import AbsoluteDropdown from "../ui/AbsoluteDropdown";

type ChainSelectorProps = {
  domainName: string;
  selectedChainId: number;
  setSelectedChainId: (chainId: number) => void;
  chainDirection?: "up" | "down";
};

export default function ChainSelector({
  domainName,
  selectedChainId,
  setSelectedChainId,
  chainDirection = "down",
}: ChainSelectorProps) {
  const selectedChain = CHAINS.find((chain) => chain.id === selectedChainId);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const { isLoading, options } = useDomainSearch({
    searchInputText: domainName,
  });

  const suggestions = useMemo(() => {
    return options.map((option) => ({
      id: option.chain.toString(),
      ...option,
    }));
  }, [options]);

  const handleChangeChain = (chainId: number) => {
    setSelectedChainId(chainId);
    setShowSuggestion(false);
  };

  return (
    <View>
      <Pressable
        style={styles.valueWrapper}
        onPress={() => setShowSuggestion((prev) => !prev)}
      >
        <Image source={selectedChain?.icon} style={styles.valueIcon} />
        <Icon
          name="chevron-down"
          size={15}
          color={CustomDarkTheme.colors.body}
        />
      </Pressable>
      <AbsoluteDropdown
        isVisible={showSuggestion}
        style={[
          { right: -getWidthSize(40) },
          chainDirection === "up" && { bottom: getHeightSize(40) },
          chainDirection === "down" && { top: getHeightSize(40) },
        ]}
        onOutsideClick={() => setShowSuggestion(false)}
      >
        <ScrollView
          style={styles.suggestionWrapper}
          contentContainerStyle={{ gap: 8, padding: 12 }}
          nestedScrollEnabled={true}
        >
          {suggestions.map((suggestion) => (
            <Pressable
              key={suggestion.id}
              style={styles.suggestionItem}
              onPress={() => handleChangeChain(suggestion.chain)}
            >
              <DomainText
                domainName={suggestion.domain}
                chainId={suggestion.chain}
              />
              <BadgeLoader
                loading={isLoading}
                isAvailable={suggestion.status}
              />
            </Pressable>
          ))}
        </ScrollView>
      </AbsoluteDropdown>
    </View>
  );
}

const styles = StyleSheet.create({
  valueWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 8,
    backgroundColor: `${CustomDarkTheme.colors.actionBg}66`,
    borderWidth: 1,
    borderColor: "#F4F4F56E",
    borderRadius: 10,
    gap: 4,
  },
  valueIcon: {
    width: 14,
    height: 14,
    borderRadius: 9999,
  },
  suggestionWrapper: {
    width: Dimensions.get("window").width - 32,
    backgroundColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F4F4F56E",
    zIndex: 1000,
    maxHeight: 250,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    height: 45,
  },
});
