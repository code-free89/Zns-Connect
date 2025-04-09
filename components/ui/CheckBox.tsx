import Checkbox, { CheckboxProps } from "expo-checkbox";
import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default function CheckBox(props: CheckboxProps) {
  return (
    <Checkbox
      {...props}
      color={CustomDarkTheme.colors.primary}
      style={[props.style, styles.checkbox]}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    color: CustomDarkTheme.colors.primary,
    borderColor: CustomDarkTheme.colors.primary,
    backgroundColor: "transparent",
    borderRadius: 4,
    borderWidth: 0.5,
    width: 16,
    height: 16,
  },
});
