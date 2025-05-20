import { StyleSheet, Text } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import HipInfo from "@/components/zns/hip/Info";
import HipProfile from "@/components/zns/hip/Profile";
import HipTabs from "@/components/zns/hip/Tabs";
import { fontStyles } from "@/constants/fonts";
import HipProvider from "@/lib/providers/HipProvider";
import ReferralProvider from "@/lib/providers/ReferralProvider";
import { getFontSize, getHeightSize } from "@/utils/size";

export default function HipScreen() {
  return (
    <ZnsScrollView style={{ paddingTop: 0 }}>
      <HipProfile />

      <HipInfo />

      <Text style={styles.buildWeb3Text}>
        Build your reputation in #web3 space
      </Text>

      <HipTabs />

      <ReferralProvider />
      <HipProvider />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  buildWeb3Text: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getFontSize(18),
    color: "white",
    marginTop: getHeightSize(30),
    marginBottom: getHeightSize(24),
  },
});
