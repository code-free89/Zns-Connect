import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { SearchIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";

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
              style={{ marginTop: 40 }}
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
    fontSize: 20,
    color: CustomDarkTheme.colors.txtColor,
    lineHeight: 20 * 1.5,
    marginTop: 16,
  },
  description: {
    ...fontStyles["Poppins-Medium"],
    fontSize: 14,
    color: CustomDarkTheme.colors.body,
    lineHeight: 20,
    letterSpacing: 0.14,
    marginTop: 4,
  },
});
