import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

type ItemType = {
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
};

export default function ZnsDropdown({
  label,
  value,
  setValue,
  items,
  placeholder,
}: Props) {
  const selectedItem = items.find((item) => item.value === value);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Pressable
        style={styles.selectedItemContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? (
          <View style={styles.selectedItem}>
            <Image source={selectedItem.icon} style={styles.itemIcon} />
            <Text
              style={[fontStyles["Poppins-Medium"], styles.selectedItemText]}
            >
              {selectedItem.label}
            </Text>
            <Icon
              name="chevron-down"
              size={20}
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
      {isOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView>
            {items.map((item, idx) => (
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
                    {item.label}
                  </Text>
                </Pressable>
                {/* Add separator except after last item */}
                {idx < items.length - 1 && <View style={{ height: 14 }} />}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
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
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
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
    gap: getWidthSize(4),
  },
  selectedItemText: {
    ...fontStyles["Poppins-Medium"],
    flex: 1,
    fontSize: getHeightSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getHeightSize(16 * 1.5),
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
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.5),
    textAlign: "left",
  },
  dropdownContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: getWidthSize(12),
    paddingRight: getWidthSize(8),
    position: "absolute",
    top: getHeightSize(80),
    zIndex: 1,
    width: "100%",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    height: getHeightSize(300),
    overflow: "scroll",
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
    fontSize: getHeightSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getHeightSize(16 * 1.5),
  },
  itemText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(16),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getHeightSize(16 * 1.5),
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  textSelected: {
    color: CustomDarkTheme.colors.primary,
  },
});
