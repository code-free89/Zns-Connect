import { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";

import BadgeLoader from "@/components/zns/BadgeLoader";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import useDomainSearch from "@/hooks/useDomainSearch";

type SearchDomainProps = {
  onSelectItem: (item: any) => void;
};

export default function SearchDomain({ onSelectItem }: SearchDomainProps) {
  const [searchInputText, setSearchInputText] = useState("");
  const { isLoading, options } = useDomainSearch({
    searchInputText,
  });

  const suggestions = useMemo(() => {
    return options.map((option) => ({
      id: option.chain.toString(),
      ...option,
    }));
  }, [options]);

  return (
    <AutocompleteDropdown
      showClear={false}
      showChevron={false}
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={false}
      direction={Platform.select({ ios: "down" })}
      onSelectItem={onSelectItem}
      dataSet={suggestions}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      textInputProps={{
        placeholder: "Search domains",
      }}
      debounce={600}
      suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
      onChangeText={setSearchInputText}
      suggestionsListContainerStyle={styles.suggestionsListContainer}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={(item: any) => {
        return (
          <View style={styles.suggestionItem}>
            <Image source={item.icon} style={styles.icon} />
            <Text
              style={[
                fontStyles["Poppins-Regular"],
                styles.suggestionsListText,
              ]}
            >
              {item.domain}.
              <Text style={{ color: item.color }}>{item.tld}</Text>
            </Text>
            <BadgeLoader loading={isLoading} isAvailable={item.status} />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#292925CC",
  },
  suggestionsListContainer: {
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    borderRadius: 12,
    padding: 12,
  },
  suggestionsListText: {
    flex: 1,
    color: CustomDarkTheme.colors.txtColor,
  },
  suggestionItem: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 45,
  },
  icon: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
});
