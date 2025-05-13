import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  AutocompleteDropdown,
  IAutocompleteDropdownRef,
} from "react-native-autocomplete-dropdown";

import BadgeLoader from "@/components/zns/BadgeLoader";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import useDomainSearch from "@/hooks/useDomainSearch";
import { AvailableDomainType } from "@/lib/model/domain";
import { useAppDispatch } from "@/store";
import { setSearchResult } from "@/store/slices/recents";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type SearchDomainProps = {
  onSelectItem: (item: any) => void;
  onChangeSuggestions: (suggestions: AvailableDomainType[]) => void;
};

export default function SearchDomain({
  onSelectItem,
  onChangeSuggestions,
}: SearchDomainProps) {
  const dispatch = useAppDispatch();
  const controller = useRef<IAutocompleteDropdownRef | null>(null);
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

  useEffect(() => {
    onChangeSuggestions(suggestions as AvailableDomainType[]);
  }, [suggestions]);

  return (
    <AutocompleteDropdown
      showClear={false}
      showChevron={false}
      clearOnFocus={false}
      closeOnBlur={true}
      closeOnSubmit={true}
      controller={controller}
      direction="down"
      onSelectItem={onSelectItem}
      dataSet={suggestions}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      textInputProps={{
        placeholder: "Search domains",
        placeholderTextColor: CustomDarkTheme.colors.caption,
        style: [
          fontStyles["Poppins-Regular"],
          {
            color: CustomDarkTheme.colors.txtColor,
            fontSize: getFontSize(16),
            lineHeight: getFontSize(16) * 1.5,
          },
        ],
        onSubmitEditing: () => {
          controller.current?.close();
          dispatch(
            setSearchResult({ ...options[0], chain: 0 } as AvailableDomainType)
          );
        },
        onBlur: () => {
          dispatch(
            setSearchResult({ ...options[0], chain: 0 } as AvailableDomainType)
          );
          controller.current?.close();
        },
      }}
      debounce={600}
      suggestionsListMaxHeight={Dimensions.get("window").height * 0.3}
      onChangeText={setSearchInputText}
      suggestionsListContainerStyle={styles.suggestionsListContainer}
      ItemSeparatorComponent={() => (
        <View style={{ height: getHeightSize(10) }} />
      )}
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
    paddingVertical: 1,
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
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
  suggestionItem: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(10),
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  icon: {
    width: 17,
    height: 17,
    borderRadius: 100,
  },
});
