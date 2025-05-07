import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";
import React, { Dispatch, SetStateAction } from "react";
import { Platform, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

type Props = {
  cellCount?: number;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
};

export default function CodeInput({
  cellCount = 4,
  value,
  setValue,
  style,
}: Props) {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={setValue}
      cellCount={cellCount}
      rootStyle={style}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete={Platform.select({
        android: "sms-otp",
        default: "one-time-code",
      })}
      testID="my-code-input"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[
            styles.cell,
            isFocused && styles.focusCell,
            index !== cellCount && styles.margin,
          ]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cell: {
    width: getWidthSize(48),
    height: getWidthSize(48),
    borderRadius: 12,
    borderWidth: 1.65,
    borderColor: "#3D3B26",
    color: CustomDarkTheme.colors.textPrimary,
    lineHeight: getHeightSize(36),
    fontSize: getHeightSize(24),
    textAlign: "center",
  },
  focusCell: {
    borderColor: CustomDarkTheme.colors.primary,
  },
  margin: {
    marginRight: getWidthSize(12),
  },
});
