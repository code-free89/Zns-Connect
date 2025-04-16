import { FlatList, StyleSheet, View } from "react-native";

import FollowItem from "@/components/zns/FollowItem";

const followers = [
  {
    name: "Metamask",
    avatar: require("@/assets/images/app/badges/1-letter.png"),
    description: "metomask.cz,Tokyo,Tech innovator",
    isFollowing: true,
  },
  {
    name: "Bigman",
    avatar: require("@/assets/images/app/badges/2-letter.png"),
    description: "metomask.cz,Tokyo,Tech innovator",
    isFollowing: false,
  },
];

export default function ProfileFollowers() {
  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={({ item }) => <FollowItem item={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
