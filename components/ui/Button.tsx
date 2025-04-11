import { CustomDarkTheme } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "text";
}

export default function Button({
  title,
  variant = "primary",
  style,
  textStyle,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primaryButton,
        variant === "secondary" && styles.secondaryButton,
        variant === "text" && styles.textButton,
        props.disabled && styles.disabledButton,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" && styles.primaryText,
          variant === "secondary" && styles.secondaryText,
          textStyle,
          props.disabled && styles.disabledText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
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
    fontWeight: "600",
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
});
