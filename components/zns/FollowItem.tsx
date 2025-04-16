import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import { CustomDarkTheme } from "@/constants/theme";
import Button from "@/components/ui/Button";

interface FollowItemProps {
  item: {
    name: string;
    avatar: any;
    description: string;
    isFollowing: boolean;
  };
}

export default function FollowItem({ item }: FollowItemProps) {
  return (
    <View style={styles.container}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ width: 150 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Button
        variant={item.isFollowing ? "outline" : "primary"}
        style={styles.statusButton}
      >
        {item.isFollowing ? (
          <AntDesign
            name="checkcircleo"
            size={12}
            color={CustomDarkTheme.colors.p700}
          />
        ) : (
          <AntDesign
            name="pluscircleo"
            size={12}
            color={CustomDarkTheme.colors.p950}
          />
        )}
        <Text
          style={item.isFollowing ? styles.followingText : styles.followText}
        >
          {item.isFollowing ? "Followed" : "Follow"}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
  followingText: {
    fontSize: 12,
    fontWeight: 600,
    color: CustomDarkTheme.colors.p700,
  },
  followText: {
    fontSize: 12,
    fontWeight: 600,
    color: CustomDarkTheme.colors.p950,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 92,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginLeft: "auto",
  },
});
