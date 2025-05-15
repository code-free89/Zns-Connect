import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import AbsoluteDropdown from "../AbsoluteDropdown";

type Props = TextInputProps & {
  label?: string;
  control: Control<any>;
  name: string;
  options: { label: string; value: string }[];
  containerStyle?: StyleProp<ViewStyle>;
};

export default function FormSelect({
  control,
  name,
  label,
  options,
  containerStyle,
  ...props
}: Props) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const selectedItem = options.find((item) => item.value === value);
        return (
          <View>
            <Text style={styles.label}>{label}</Text>
            <Pressable
              style={[styles.currentContainer, containerStyle]}
              onPress={() => setShowOptions(true)}
            >
              <Text style={styles.currentText}>{selectedItem?.label}</Text>
            </Pressable>

            <AbsoluteDropdown
              isVisible={showOptions}
              onOutsideClick={() => setShowOptions(false)}
              style={styles.dropdownContainer}
            >
              {options.map((item) => (
                <Pressable
                  key={item.value}
                  style={styles.selectItem}
                  onPress={() => {
                    onChange(item.value);
                    setShowOptions(false);
                  }}
                >
                  <Text
                    style={[
                      styles.selectItemText,
                      item.value === value && styles.selectedItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </AbsoluteDropdown>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  label: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
    marginBottom: getHeightSize(8),
  },
  currentContainer: {
    paddingHorizontal: getWidthSize(14),
    paddingVertical: getHeightSize(14),
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    borderRadius: getWidthSize(16),
  },
  currentText: {
    color: CustomDarkTheme.colors.txtColor,
  },
  dropdownContainer: {
    top: getHeightSize(80),
    left: 0,
    width: "100%",
    padding: getWidthSize(14),
    borderRadius: getWidthSize(12),
    backgroundColor: CustomDarkTheme.colors.bg,
  },
  selectItem: {
    paddingVertical: getHeightSize(8),
  },
  selectItemText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  selectedItemText: {
    color: CustomDarkTheme.colors.primary,
  },
});
