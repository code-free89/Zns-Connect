import { CustomDarkTheme } from "@/constants/theme";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  label?: string;
  value: string;
  setValue: (newVal: string) => void;
  items: {
    label: string;
    value: string;
  }[];
};

export default function ZnsDropdown({ label, value, setValue, items }: Props) {
  return (
    <View style={styles.container}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.itemsContainer}
        itemContainerStyle={styles.item}
        data={items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? "blue" : "black"}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
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
    fontWeight: 400,
    fontSize: 14,
  },
  dropdown: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemsContainer: {
    backgroundColor: "black",
    marginTop: 4,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    padding: 16,
    paddingBottom: 2,
  },
  item: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    marginBottom: 14,
  },
});
