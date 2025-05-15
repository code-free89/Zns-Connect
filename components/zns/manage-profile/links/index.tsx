import { StyleSheet, View } from "react-native";

import OfficialLinks from "@/components/zns/manage-profile/links/OfficialLinks";
import SocialLinks from "@/components/zns/manage-profile/links/SocialLinks";
import OtherLinks from "@/components/zns/manage-profile/links/OtherLinks";
import { getHeightSize } from "@/utils/size";
import Button from "@/components/ui/Button";

export default function ProfileLinks() {
  return (
    <View style={styles.container}>
      <SocialLinks />
      <OfficialLinks />
      <OtherLinks />

      <Button
        title="Save changes"
        // onPress={handleSubmit(onSubmit)}
        // disabled={!isDirty}
        style={{ marginTop: "auto" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: getHeightSize(24),
    gap: getHeightSize(40),
  },
});
