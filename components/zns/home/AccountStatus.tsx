import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

import { CreditIcon, SilverMedalIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import React from "react";

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

export default function AccountStatus() {
  return (
    <View style={styles.container}>
      <Row>
        {/* Your Credit */}
        <TouchableOpacity style={styles.statusContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Your Credit</Text>
            <View style={styles.iconContainer}>
              <CreditIcon />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>0 Credits</Text>
            <FontAwesome6
              name="chevron-right"
              size={13}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Referrals */}
        <TouchableOpacity style={styles.statusContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Referrals</Text>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="link-variant"
                size={13}
                color="white"
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>0</Text>
            <Feather
              name="copy"
              size={13}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>
      </Row>

      <Row>
        {/* Badge earned */}
        <TouchableOpacity style={styles.statusContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Badges earned</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/images/icons/silver-medal.png")}
                style={{ width: 13, height: 16, marginHorizontal: 2 }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>0 badges</Text>
            <FontAwesome6
              name="chevron-right"
              size={13}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* HIP Protocol */}
        <TouchableOpacity style={styles.statusContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>HIP Protocol</Text>
            <View style={styles.iconContainer}>
              <UserIcon
                width={13}
                height={13}
                color={CustomDarkTheme.colors.txtColor}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>0</Text>
            <View style={{ flexDirection: "row", gap: 2 }}>
              <Text style={styles.mintLabel}>Mint HIP</Text>
              <FontAwesome6
                name="chevron-right"
                size={13}
                color={CustomDarkTheme.colors.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
    width: "100%",
    gap: 8,
  },
  statusContainer: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 120,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: CustomDarkTheme.colors.body,
    fontWeight: 400,
    fontSize: 14,
  },
  value: {
    color: CustomDarkTheme.colors.txtColor,
    fontWeight: 400,
    fontSize: 16,
  },
  iconContainer: {
    padding: 4,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: CustomDarkTheme.colors.actionBg,
  },
  mintLabel: {
    color: CustomDarkTheme.colors.primary,
    fontWeight: 400,
    fontSize: 12,
  },
});
