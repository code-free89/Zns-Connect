import {
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  View,
} from "react-native";

import { CustomDarkTheme } from "@/constants/theme";

export default function TextInput({ ...props }: TextInputProps) {
  return (
    <View style={[styles.container]}>
      <RNTextInput
        {...props}
        placeholderTextColor={CustomDarkTheme.colors.caption}
        style={[styles.input, props.style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    borderRadius: 16,
  },
  input: {
    color: CustomDarkTheme.colors.txtColor,
  },
});
