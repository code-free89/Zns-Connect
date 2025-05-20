import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CreditIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

const Row = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

export default function AccountStatus() {
  const { userCredit, user } = useAppSelector((state) => state.user);
  const hipData = useAppSelector((state) => state.hip);
  const router = useRouter();

  const goToCredits = () => {
    router.push({
      pathname: "/(zns)/general-settings",
      params: {
        source: "credits",
      },
    });
  };

  const goToHip = () => {
    router.push({
      pathname: "/(zns)/hip",
    });
  };

  const goToBadges = () => {
    router.push({
      pathname: "/(zns)/badges",
    });
  };

  return (
    <View style={styles.container}>
      <Row>
        {/* Your Credit */}
        <TouchableOpacity style={styles.statusContainer} onPress={goToCredits}>
          <View style={styles.row}>
            <Text style={styles.label}>Your Credit</Text>
            <View style={styles.iconContainer}>
              <CreditIcon />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{userCredit} Credits</Text>
            <FontAwesome6
              name="chevron-right"
              size={getWidthSize(13)}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>

        {/* Referrals */}
        <TouchableOpacity style={styles.statusContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Referrals</Text>
            <View style={styles.iconContainer}>
              <Feather
                name="link"
                size={getWidthSize(13)}
                color={CustomDarkTheme.colors.txtColor}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>0</Text>
            <Feather
              name="copy"
              size={getWidthSize(13)}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>
      </Row>

      <Row>
        {/* HIP Protocol */}
        <TouchableOpacity style={styles.statusContainer} onPress={goToHip}>
          <View style={styles.row}>
            <Text style={styles.label}>HIP Protocol</Text>
            <View style={styles.iconContainer}>
              <UserIcon
                width={15}
                height={15}
                color={CustomDarkTheme.colors.txtColor}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{hipData.totalPoints ?? 0} XP</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: getWidthSize(5),
              }}
            >
              <Text style={styles.mintLabel}>
                {hipData && hipData.id ? "Open HIP" : "Mint HIP"}
              </Text>
              <FontAwesome6
                name="chevron-right"
                size={getWidthSize(13)}
                color={CustomDarkTheme.colors.primary}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Badge earned */}
        <TouchableOpacity style={styles.statusContainer} onPress={goToBadges}>
          <View style={styles.row}>
            <Text style={styles.label}>Badges earned</Text>
            <View style={styles.iconContainer}>
              <Image
                source={require("@/assets/images/icons/silver-medal.png")}
                style={{
                  width: getWidthSize(13),
                  height: getHeightSize(16),
                  marginHorizontal: getWidthSize(2),
                }}
              />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>
              {(user?.badges ?? []).length} Badges
            </Text>
            <FontAwesome6
              name="chevron-right"
              size={getWidthSize(13)}
              color={CustomDarkTheme.colors.primary}
            />
          </View>
        </TouchableOpacity>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: getWidthSize(8),
  },
  statusContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.stroke,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getWidthSize(12),
    flexDirection: "column",
    justifyContent: "space-between",
    height: getHeightSize(118),
  },
  row: {
    flexDirection: "row",
    gap: getWidthSize(8),
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.body,
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
  value: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.txtColor,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
  },
  iconContainer: {
    padding: getWidthSize(6),
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: CustomDarkTheme.colors.actionBg,
  },
  mintLabel: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.primary,
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    marginTop: 2,
  },
});
