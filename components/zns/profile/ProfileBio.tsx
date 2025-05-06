import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function ProfileBio() {
  const { profile, domain, tld } = useAppSelector((state) => state.profile);
  const bio = profile?.bio ?? " ";
  const maxLength = 160;

  const truncatedBio =
    bio.length > maxLength ? bio.substring(0, maxLength) : bio;

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            height: 36,
            flexDirection: "row",
          }}
        >
          <GradientText
            text={profile?.name ?? ""}
            textStyle={[fontStyles["Poppins-SemiBold"], styles.gradientText]}
          />
        </View>
        <Text style={[fontStyles["Poppins-Regular"], styles.bioText]}>
          {domain ? `${domain}.${tld}` : ""}
        </Text>
      </View>

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
      >
        <View style={styles.shortIntroContainer}>
          {!!profile?.bio ? (
            <Text style={[fontStyles["Poppins-Regular"], styles.bioText]}>
              {truncatedBio}
            </Text>
          ) : (
            <React.Fragment>
              <Image source={require("@/assets/images/icons/intro.png")} />
              <Text
                style={[fontStyles["Poppins-Regular"], styles.shortIntroText]}
              >
                Short intro about you appear here
              </Text>
            </React.Fragment>
          )}
        </View>
      </GradientBorderViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  gradientText: {
    fontSize: 24,
    marginLeft: 0,
  },
  bioText: {
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: 14 * 1.5,
  },
  shortIntroContainer: {
    padding: 9,
    backgroundColor: `${CustomDarkTheme.colors.grey2}`,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  shortIntroText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
  editButton: {
    marginLeft: "auto",
    marginRight: 10,
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.p500,
  },
});
