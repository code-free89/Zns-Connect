import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import ZnsText from "./Text";

type ItemType = {
  label: string;
  value: string;
  icon?: string;
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
      {!!label && <ZnsText style={styles.label}>{label}</ZnsText>}
      <Pressable
        style={styles.selectedItemContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        {selectedItem ? (
          <View style={styles.selectedItem}>
            <Image
              source={{ uri: selectedItem.icon }}
              style={styles.itemIcon}
            />
            <ZnsText type="medium" style={styles.selectedItemText}>
              {selectedItem.label}
            </ZnsText>
            <Icon
              name="chevron-down"
              size={20}
              color={CustomDarkTheme.colors.body}
            />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <ZnsText type="medium" style={styles.placeholderText}>
              {placeholder ?? "Select an item"}
            </ZnsText>
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
          <FlatList
            data={items}
            ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
            renderItem={({ item }) => (
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
                  <Image source={{ uri: item.icon }} style={styles.itemIcon} />
                )}
                <ZnsText
                  style={[
                    styles.itemText,
                    item.value === value && styles.textSelected,
                  ]}
                >
                  {item.label}
                </ZnsText>
              </Pressable>
            )}
          />
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
    top: 84,
    zIndex: 1000,
    width: "100%",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    height: 300,
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
  },
  itemSelected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  textSelected: {
    color: CustomDarkTheme.colors.primary,
  },
});
