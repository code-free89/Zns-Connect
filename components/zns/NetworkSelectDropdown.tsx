import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Image,
  Pressable,
  // ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import AbsoluteDropdown from "@/components/ui/AbsoluteDropdown";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { tlds } from "@/constants/web3/tlds";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { ScrollView } from "react-native-gesture-handler";

type ItemType = {
  id: number;
  label: string;
  value: string;
  icon?: any;
};

type Props = {
  label?: string;
  value: string;
  setValue: (newVal: string) => void;
  items: ItemType[];
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function NetworkSelectDropdown({
  label,
  value,
  setValue,
  items,
  placeholder,
  containerStyle,
}: Props) {
  const selectedItem = items.find((item) => item.value === value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={[styles.selectedItemContainer, containerStyle]}
        onPress={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? (
          <View style={styles.selectedItem}>
            <Image source={selectedItem.icon} style={styles.itemIcon} />
            <Text style={styles.selectedItemText}>{selectedItem.label}</Text>
            <Icon
              name="chevron-down"
              size={getWidthSize(20)}
              color={CustomDarkTheme.colors.body}
            />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text
              style={[fontStyles["Poppins-Medium"], styles.placeholderText]}
            >
              {placeholder ?? "Select an item"}
            </Text>
            <Icon
              name="chevron-down"
              size={20}
              color={CustomDarkTheme.colors.body}
            />
          </View>
        )}
      </Pressable>

      <AbsoluteDropdown
        isVisible={isOpen}
        onOutsideClick={() => setIsOpen(false)}
        style={{
          top: getHeightSize(80),
          width: "100%",
        }}
      >
        <View style={styles.dropdownContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {items.map((item, idx) => {
              const tld =
                tlds.find((tld) => tld.chainId === item.id)?.label ?? "";
              return (
                <View key={item.value}>
                  <Pressable
                    style={[
                      styles.item,
                      item.value === value && styles.itemSelected,
                    ]}
                    onPress={() => {
                      setValue(item.value);
                      setIsOpen(false);
                    }}
                  >
                    {item.icon && (
                      <Image source={item.icon} style={styles.itemIcon} />
                    )}
                    <Text
                      style={[
                        fontStyles["Poppins-Regular"],
                        styles.itemText,
                        item.value === value && styles.textSelected,
                      ]}
                    >
                      .{tld}
                    </Text>
                  </Pressable>
                  {/* Add separator except after last item */}
                  {idx < items.length - 1 && <View style={{ height: 14 }} />}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </AbsoluteDropdown>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: getHeightSize(8),
  },
  label: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.body,
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(4),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(8),
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(5),
  },
  selectedItemText: {
    ...fontStyles["Poppins-Medium"],
    flex: 1,
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getFontSize(16) * 1.5,
  },
  placeholder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: getWidthSize(8),
    paddingRight: getWidthSize(4),
  },
  placeholderText: {
    ...fontStyles["Poppins-Medium"],
    color: CustomDarkTheme.colors.body,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    textAlign: "left",
  },
  dropdownContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: getWidthSize(12),
    paddingRight: getWidthSize(8),
    zIndex: 1,
    width: "100%",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    height: getHeightSize(280),
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    paddingVertical: getHeightSize(10),
    paddingHorizontal: getWidthSize(12),
    marginRight: getWidthSize(6),
    borderWidth: 1,
    borderColor: "transparent",
  },
  itemIcon: {
    width: 22,
    height: 22,
    borderRadius: 12,
  },
  selectedTextStyle: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getFontSize(16) * 1.5,
  },
  itemText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getFontSize(16) * 1.5,
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  textSelected: {
    color: CustomDarkTheme.colors.primary,
  },
});
