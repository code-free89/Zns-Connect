import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "outline" | "text";
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  title,
  variant = "primary",
  style,
  textStyle,
  loading = false,
  loadingText = "Submitting...",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primaryButton,
        variant === "secondary" && styles.secondaryButton,
        variant === "outline" && styles.outlineButton,
        variant === "text" && styles.textButton,
        (props.disabled || loading) &&
          (variant === "text"
            ? styles.disabledTextButton
            : styles.disabledButton),
        style,
      ]}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text
            style={[
              styles.text,
              variant === "primary" && styles.primaryText,
              variant === "secondary" && styles.secondaryText,
              textStyle,
              props.disabled &&
                (variant === "text"
                  ? styles.disabledEmptyText
                  : styles.disabledText),
            ]}
          >
            {loadingText}
          </Text>
          <ActivityIndicator size="small" color="#000000" />
        </View>
      ) : (
        <>
          {props.children}
          {!!title && (
            <Text
              style={[
                styles.text,
                variant === "primary" && styles.primaryText,
                variant === "secondary" && styles.secondaryText,
                textStyle,
                props.disabled &&
                  (variant === "text"
                    ? styles.disabledEmptyText
                    : styles.disabledText),
              ]}
            >
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: getHeightSize(14),
    paddingHorizontal: getWidthSize(24),
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledTextButton: {},
  disabledButton: {
    backgroundColor: CustomDarkTheme.colors.disabledBackground,
  },
  primaryButton: {
    backgroundColor: CustomDarkTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: CustomDarkTheme.colors.secondaryBtn,
  },
  text: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.p950,
  },
  disabledEmptyText: {
    opacity: 0.3,
  },
  disabledText: {
    color: CustomDarkTheme.colors.textDisabled,
  },
  primaryText: {
    color: "#101010",
  },
  secondaryText: {
    color: CustomDarkTheme.colors.primary,
  },
  textButton: {
    backgroundColor: "transparent",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.p700,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
});
