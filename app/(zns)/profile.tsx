import { StyleSheet, Text, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileHIP from "@/components/zns/profile/ProfileHIP";
import ProfileInfo from "@/components/zns/profile/ProfileInfo";
import ProfileType from "@/components/zns/profile/ProfileType";

export default function HomeScreen() {
  return (
    <ZnsScrollView>
      <View style={styles.container}>
        <ProfileInfo />

        <ProfileHIP />

        <ProfileType />
        <Text>asdf</Text>
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
