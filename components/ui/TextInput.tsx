import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";

import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";

interface Props extends TextInputProps {
  label?: string;
}

export default function TextInput({ label, ...props }: Props) {
  return (
    <View>
      {!!label && <ZnsText style={styles.label}>{label}</ZnsText>}
      <View style={[styles.container]}>
        <RNTextInput
          {...props}
          placeholderTextColor={CustomDarkTheme.colors.caption}
          style={[styles.input, props.style]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: CustomDarkTheme.colors.body,
    marginBottom: 8,
  },
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
