import { router, usePathname } from "expo-router";
import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import {
  CartIcon,
  HomeIcon,
  SearchIcon,
  UserAddIcon,
  UserIcon,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize } from "@/utils/size";

type CustomBottomTabButtonProps = {
  name: string;
  href: any;
  label: string;
};

const CustomBottomTabButton = forwardRef(
  ({ name, href, label }: CustomBottomTabButtonProps, ref: any) => {
    const pathname = usePathname();
    const { carts } = useAppSelector((state) => state.setting);

    return (
      <Pressable ref={ref} onPress={() => router.push(href)}>
        {({ pressed }) => (
          <View style={styles.container}>
            {name === "home" && (
              <HomeIcon
                color={
                  pathname === href
                    ? CustomDarkTheme.colors.p500
                    : CustomDarkTheme.colors.body
                }
              />
            )}
            {name === "register" && (
              <SearchIcon
                color={
                  pathname === href
                    ? CustomDarkTheme.colors.p500
                    : CustomDarkTheme.colors.body
                }
              />
            )}
            {name === "profile" && (
              <UserIcon
                color={
                  pathname === href
                    ? CustomDarkTheme.colors.p500
                    : CustomDarkTheme.colors.body
                }
              />
            )}
            {name === "cart" && (
              <>
                <CartIcon
                  color={
                    pathname === href
                      ? CustomDarkTheme.colors.p500
                      : CustomDarkTheme.colors.body
                  }
                />
                {carts.length > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{carts.length}</Text>
                  </View>
                )}
              </>
            )}
            {name === "referrals" && (
              <UserAddIcon
                color={
                  pathname === href
                    ? CustomDarkTheme.colors.p500
                    : CustomDarkTheme.colors.body
                }
              />
            )}
            <Text
              style={[
                pathname === href
                  ? fontStyles["Poppins-SemiBold"]
                  : fontStyles["Poppins-Regular"],
                styles.label,
                pathname === href && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }
);

export default CustomBottomTabButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  label: {
    fontSize: getFontSize(10),
    color: CustomDarkTheme.colors.body,
    lineHeight: getFontSize(10) * 1.5,
  },
  activeLabel: {
    color: CustomDarkTheme.colors.p500,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: 5,
    backgroundColor: CustomDarkTheme.colors.p500,
    borderRadius: 100,
    width: getHeightSize(14),
    height: getHeightSize(14),
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: getFontSize(10),
    color: "black",
  },
});
