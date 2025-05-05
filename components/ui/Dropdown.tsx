import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { fontStyles } from "@/constants/fonts";

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
      {!!label && (
        <Text style={[fontStyles["Poppins-Regular"], styles.label]}>
          {label}
        </Text>
      )}
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
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: CustomDarkTheme.colors.body,
    fontSize: 14,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectedItemText: {
    flex: 1,
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
    marginTop: 2,
  },
  placeholder: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 8,
    paddingRight: 4,
  },
  placeholderText: {
    color: CustomDarkTheme.colors.body,
    fontSize: 16,
    textAlign: "left",
  },
  dropdownContainer: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: 16,
    paddingRight: 10,
    position: "absolute",
    top: 88,
    zIndex: 1,
    width: "100%",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    height: 300,
    overflow: "scroll",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  itemIcon: {
    width: 22,
    height: 22,
    borderRadius: 12,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
  itemText: {
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
    marginTop: 2,
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  textSelected: {
    color: CustomDarkTheme.colors.primary,
  },
});
