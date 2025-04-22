import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { forwardRef } from "react";

import {
  CartIcon,
  HomeIcon,
  SearchIcon,
  UserAddIcon,
  UserIcon,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import ZnsText from "@/components/ui/Text";

const CustomBottomTabButton = forwardRef(
  (
    {
      name,
      href,
      label,
    }: {
      name: string;
      href: any;
      label: string;
    },
    ref: any
  ) => {
    const pathname = usePathname();

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
              <CartIcon
                color={
                  pathname === href
                    ? CustomDarkTheme.colors.p500
                    : CustomDarkTheme.colors.body
                }
              />
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
            <ZnsText
              type={pathname === href ? "semiBold" : "regular"}
              style={[styles.label, pathname === href && styles.activeLabel]}
            >
              {label}
            </ZnsText>
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
    fontSize: 10,
    color: CustomDarkTheme.colors.body,
  },
  activeLabel: {
    color: CustomDarkTheme.colors.p500,
  },
});
