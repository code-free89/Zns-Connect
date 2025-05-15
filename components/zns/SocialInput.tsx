import Feather from "@expo/vector-icons/Feather";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getWidthSize } from "@/utils/size";
import React from "react";

type SocialInputProps = {
  icon: any;
  label: string;
  needVerify?: boolean;
};

export default function SocialInput({
  icon,
  label,
  needVerify = false,
}: SocialInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {typeof icon === "object" ? (
          icon
        ) : (
          <Image source={icon} style={styles.icon} />
        )}
        {!!label && <Text style={styles.label}>{label}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"asdf"}
          placeholderTextColor={CustomDarkTheme.colors.label}
        />
        {needVerify && (
          <>
            <Text style={styles.verifyBtn}>Verify</Text>
            <Feather
              name="info"
              size={16}
              color={CustomDarkTheme.colors.body}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    borderRadius: getWidthSize(16),
    overflow: "hidden",
  },
  iconContainer: {
    backgroundColor: "#26262666",
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getWidthSize(16),
    gap: getWidthSize(4),
  },
  icon: {
    width: getWidthSize(18),
    height: getWidthSize(18),
  },
  label: {
    fontSize: getFontSize(12),
    fontWeight: 500,
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.label,
  },
  input: {
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(4),
    paddingHorizontal: getWidthSize(12),
  },
  verifyBtn: {
    paddingHorizontal: getWidthSize(8),
    color: CustomDarkTheme.colors.accent,
    fontSize: getFontSize(12),
    fontWeight: 500,
    lineHeight: getFontSize(12) * 1.5,
  },
});
