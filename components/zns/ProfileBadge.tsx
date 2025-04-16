import { CustomDarkTheme } from "@/constants/theme";
import { Image, StyleSheet, Text, View } from "react-native";

interface ProfileBadgeProps {
  badge: {
    name: string;
    icon: any;
    status: string;
  };
}

export default function ProfileBadge({ badge }: ProfileBadgeProps) {
  return (
    <View style={styles.container}>
      <Image
        source={badge.icon}
        style={{ width: "100%" }}
        resizeMode="stretch"
      />
      <Text style={styles.name}>{badge.name}</Text>
      <View>
        {badge.status === "claimed" ? (
          <Text style={styles.claimed}>Claimed</Text>
        ) : badge.status === "available" ? (
          <Text style={styles.available}>Available</Text>
        ) : (
          <Text style={styles.not_available}>Not Available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.body,
    marginTop: 2,
  },
  claimed: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.body,
    marginTop: 2,
  },
  available: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.body,
    marginTop: 2,
  },
  not_available: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.body,
    marginTop: 2,
  },
});
