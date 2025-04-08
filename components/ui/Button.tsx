import { CustomDarkTheme } from "@/constants/theme";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  title,
  variant = "primary",
  style,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "primary" && styles.primaryButton,
        variant === "secondary" && styles.secondaryButton,
        style,
      ]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === "primary" && styles.primaryText,
          variant === "secondary" && styles.secondaryText,
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
  primaryButton: {
    backgroundColor: CustomDarkTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#000000",
  },
  secondaryText: {
    color: CustomDarkTheme.colors.primary,
  },
});
