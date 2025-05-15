import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function TextInput({ label, containerStyle, ...props }: Props) {
  return (
    <View>
      {!!label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {!!props.maxLength && (
            <Text style={styles.maxLength}>
              {props.value?.length || 0}/{props.maxLength}
            </Text>
          )}
        </View>
      )}
      <View style={[styles.container, containerStyle]}>
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
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getHeightSize(8),
  },
  maxLength: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  container: {
    padding: getWidthSize(14),
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    borderRadius: getWidthSize(16),
  },
  input: {
    color: CustomDarkTheme.colors.txtColor,
  },
});
