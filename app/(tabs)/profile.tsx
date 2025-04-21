import { StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileHIP from "@/components/zns/profile/ProfileHIP";
import ProfileBio from "@/components/zns/profile/ProfileBio";
import ProfileType from "@/components/zns/profile/ProfileType";
import ProfileAccounts from "@/components/zns/profile/ProfileAccounts";
import ProfileInfo from "@/components/zns/profile/ProfileInfo";

export default function HomeScreen() {
  return (
    <ZnsScrollView style={{ paddingHorizontal: 0 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 16, gap: 20 }}>
          <ProfileBio />

          <ProfileHIP />

          <ProfileType />

          <ProfileAccounts />
        </View>

        <ProfileInfo />
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
