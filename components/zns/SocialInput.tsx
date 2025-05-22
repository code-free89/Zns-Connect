import Feather from "@expo/vector-icons/Feather";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useMemo } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getWidthSize } from "@/utils/size";
import useSocialAuth from "@/hooks/useSocialAuth";

type SocialInputProps = {
  icon: any;
  label: string;
  provider: string;
  needVerify?: boolean;
  placeholder?: string;
};

// Register for web browser redirect
WebBrowser.maybeCompleteAuthSession();

export default function SocialInput({
  icon,
  label,
  provider,
  needVerify = false,
  placeholder,
}: SocialInputProps) {
  const { request, response, promptAsync } = useSocialAuth({
    provider: provider as "discord" | "twitter" | "linkedin",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      // Handle successful login
      fetchUserData(access_token);
    } else if (response?.type === "error") {
      // Handle error case
      console.error("Auth error:", response.error);
    }
  }, [response]);

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();
      console.log("User data:", userData);

      // Navigate to the appropriate screen after successful login
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Home' }], // Replace 'Home' with your target screen name
      // });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const verifySocial = () => {
    promptAsync();
  };

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
          placeholder={placeholder}
          placeholderTextColor={CustomDarkTheme.colors.label}
        />
        {needVerify && (
          <>
            <Text style={styles.verifyBtn} onPress={verifySocial}>
              Verify
            </Text>
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
