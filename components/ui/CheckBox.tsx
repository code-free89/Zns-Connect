import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import { CustomDarkTheme } from "@/constants/theme";
import { getWidthSize } from "@/utils/size";

type CheckBoxProps = {
  checked: boolean;
  onChange: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function CheckBox({ checked, onChange, style }: CheckBoxProps) {
  return (
    <Pressable style={[styles.checkbox, style]} onPress={onChange}>
      {checked && (
        <Feather name="check" size={8} color={CustomDarkTheme.colors.primary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: getWidthSize(13),
    height: getWidthSize(13),
    borderRadius: 3.6,
    backgroundColor: "#262B10",
    borderWidth: 0.5,
    borderColor: CustomDarkTheme.colors.primary,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
