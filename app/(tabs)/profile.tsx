import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileAccounts from "@/components/zns/profile/ProfileAccounts";
import ProfileBio from "@/components/zns/profile/ProfileBio";
import ProfileHIP from "@/components/zns/profile/ProfileHIP";
import ProfileInfo from "@/components/zns/profile/ProfileInfo";
import ProfileType from "@/components/zns/profile/ProfileType";
import ProfileProvider from "@/lib/providers/ProfileProvider";

export default function HomeScreen() {
  const { domain } = useLocalSearchParams();

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

      <ProfileProvider domain="tertetrtr.mnd" />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});
