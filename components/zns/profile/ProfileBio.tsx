import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getWidthSize } from "@/utils/size";

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
            textStyle={styles.gradientText}
          />
        </View>
        <Text style={styles.bioText}>{domain ? `${domain}.${tld}` : ""}</Text>
      </View>

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
      >
        <View style={styles.shortIntroContainer}>
          {!!profile?.bio ? (
            <Text style={styles.bioText}>{truncatedBio}</Text>
          ) : (
            <React.Fragment>
              <Image source={require("@/assets/images/icons/intro.png")} />
              <Text style={styles.shortIntroText}>
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
    gap: getWidthSize(20),
  },
  gradientText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(24),
    marginLeft: 0,
  },
  bioText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getFontSize(14) * 1.5,
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
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    color: CustomDarkTheme.colors.body,
  },
});
