import { FlatList, View } from "react-native";
import ProfileBadge from "../ProfileBadge";

const badges = [
  {
    name: "100 followers",
    icon: require("@/assets/images/app/badges/100-followers.png"),
    status: "claimed",
  },
  {
    name: "500 followers",
    icon: require("@/assets/images/app/badges/500-followers.png"),
    status: "claimed",
  },
  {
    name: "1,000 followers",
    icon: require("@/assets/images/app/badges/1000-followers.png"),
    status: "available",
  },
  {
    name: "10,000 followers",
    icon: require("@/assets/images/app/badges/10000-followers.png"),
    status: "not_available",
  },
  {
    name: "1 letter domains",
    icon: require("@/assets/images/app/badges/1-letter.png"),
    status: "claimed",
  },
  {
    name: "2 letter domains",
    icon: require("@/assets/images/app/badges/2-letter.png"),
    status: "not_available",
  },
  {
    name: "3 letter domains",
    icon: require("@/assets/images/app/badges/3-letter.png"),
    status: "available",
  },
  {
    name: "4 letter domains",
    icon: require("@/assets/images/app/badges/4-letter.png"),
    status: "available",
  },
  {
    name: "2 domains",
    icon: require("@/assets/images/app/badges/2-domains.png"),
    status: "available",
  },
];

export default function BadgeList() {
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.name}
        data={badges}
        numColumns={3}
        renderItem={({ item }) => <ProfileBadge badge={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
        columnWrapperStyle={{ gap: 8 }}
      />
    </View>
  );
}
