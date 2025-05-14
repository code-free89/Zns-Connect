import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { SearchIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";

type EmptyStatusProps = {
  isOwner: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  onPress?: () => void;
};

export default function EmptyStatus({
  isOwner,
  title,
  description,
  buttonLabel,
  onPress,
}: EmptyStatusProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon color={CustomDarkTheme.colors.body} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {isOwner && (
        <React.Fragment>
          <Text style={styles.description}>{description}</Text>
          {onPress && (
            <Button
              variant="outline"
              title={buttonLabel}
              onPress={onPress}
              style={{ marginTop: getHeightSize(40) }}
              textStyle={{ color: CustomDarkTheme.colors.p700 }}
            />
          )}
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHeightSize(40),
  },
  searchContainer: {
    borderRadius: 9999,
    borderWidth: 15,
    borderColor: "#1A1A1ABA",
    backgroundColor: "#1A1A1A",
    padding: 8,
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(20),
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: getFontSize(20) * 1.5,
    marginTop: getHeightSize(16),
  },
  description: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    color: CustomDarkTheme.colors.body,
    lineHeight: getFontSize(14) * 1.5,
    letterSpacing: 0.14,
    marginTop: getHeightSize(4),
  },
});
