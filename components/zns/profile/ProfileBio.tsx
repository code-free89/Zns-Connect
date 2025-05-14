import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import DummyText from "@/components/ui/DummyText";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ProfileBio() {
  const { profile, domain, tld } = useAppSelector((state) => state.profile);
  const bio = profile?.bio ?? " ";
  const maxLength = 160;
  const [profileNameSize, setProfileNameSize] = useState({
    width: 0,
    height: 0,
  });

  const truncatedBio =
    bio.length > maxLength ? bio.substring(0, maxLength) : bio;

  return (
    <View style={styles.container}>
      <View>
        <DummyText
          text={profile?.name ?? ""}
          textStyle={styles.gradientText}
          size={profileNameSize}
          setSize={setProfileNameSize}
        />
        <GradientText
          text={profile?.name ?? ""}
          textStyle={styles.gradientText}
          size={profileNameSize}
        />
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
    marginTop: getHeightSize(16),
  },
  gradientText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(24),
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
