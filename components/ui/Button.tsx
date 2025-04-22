import { CustomDarkTheme } from "@/constants/theme";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import ZnsText from "./Text";

interface ButtonProps extends TouchableOpacityProps {
  fontType?: "regular" | "medium" | "semiBold" | "bold";
  title?: string;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "outline" | "text";
}

export default function Button({
  title,
  variant = "primary",
  style,
  textStyle,
  fontType = "regular",
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
        props.disabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      {props.children}
      {!!title && (
        <ZnsText
          style={[
            styles.text,
            variant === "primary" && styles.primaryText,
            variant === "secondary" && styles.secondaryText,
            textStyle,
            props.disabled && styles.disabledText,
          ]}
          type={fontType}
        >
          {title}
        </ZnsText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
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
    fontSize: 16,
  },
  disabledText: {
    color: CustomDarkTheme.colors.textDisabled,
  },
  primaryText: {
    color: "#000000",
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
});
