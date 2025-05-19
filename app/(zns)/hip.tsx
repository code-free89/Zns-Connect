import ZnsScrollView from "@/components/ui/ScrollView";
import HipProfile from "@/components/zns/hip/Profile";

export default function HipScreen() {
  return (
    <ZnsScrollView style={{ paddingTop: 0 }}>
      <HipProfile />
    </ZnsScrollView>
  );
}
