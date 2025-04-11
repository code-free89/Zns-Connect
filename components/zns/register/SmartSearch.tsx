import { StyleSheet, View } from "react-native";

import TextInput from "@/components/ui/TextInput";
import DomainTypeSelect from "../DomainTypeSelect";
import EmptySearchResult from "./EmptySearchResult";
import RecentlyMinted from "./RecentlyMinted";

export default function SmartSearch() {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Search domains" />

      <DomainTypeSelect />

      <EmptySearchResult />

      <RecentlyMinted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
});
