import { CustomDarkTheme } from "@/constants/theme";
import { Image, StyleSheet, View } from "react-native";
import ZnxText from "@/components/ui/Text";

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
      <ZnxText type="medium" style={styles.name}>
        {badge.name}
      </ZnxText>
      <View>
        {badge.status === "claimed" ? (
          <ZnxText type="medium" style={styles.claimed}>
            Claimed
          </ZnxText>
        ) : badge.status === "available" ? (
          <ZnxText type="medium" style={styles.available}>
            Available
          </ZnxText>
        ) : (
          <ZnxText type="medium" style={styles.not_available}>
            Not Available
          </ZnxText>
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
