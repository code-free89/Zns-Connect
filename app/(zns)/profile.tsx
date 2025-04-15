import { StyleSheet, Text } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileInfo from "@/components/zns/profile/ProfileInfo";

export default function HomeScreen() {
  return (
    <ZnsScrollView>
      <ProfileInfo />
      <Text>asdf</Text>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
