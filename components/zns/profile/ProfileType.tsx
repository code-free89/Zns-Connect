import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { PROFILE_CATEGORY } from "@/constants/profile";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getDates } from "@/utils/date";

export default function ProfileType() {
  const { profile } = useAppSelector((state) => state.profile);

  const createdAt = useMemo(() => {
    return getDates(profile?.createdAt).monthYear;
  }, [profile?.createdAt]);

  const category = useMemo(
    () =>
      (profile?.category
        ? PROFILE_CATEGORY[profile.category as keyof typeof PROFILE_CATEGORY]
        : "TechInnovator"
      )
        .replace(/([A-Z])/g, " $1")
        .trim(),
    [profile]
  );

  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <FontAwesome6
          name="clock"
          size={14}
          color={CustomDarkTheme.colors.body}
        />
        <Text style={[fontStyles["Poppins-Medium"], styles.typeText]}>
          joined {createdAt}
        </Text>
      </View>

      <View style={styles.typeContainer}>
        <Image source={require("@/assets/images/icons/category.png")} />
        <Text style={[fontStyles["Poppins-Medium"], styles.typeText]}>
          {category}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  typeContainer: {
    borderRadius: 83,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: CustomDarkTheme.colors.grey2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
    lineHeight: 12 * 1.5,
  },
});
