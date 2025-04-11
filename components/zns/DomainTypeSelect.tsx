import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import DomainItem from "./DomainItem";
import DomainTypeItem from "./DomainTypeItem";
import { useState } from "react";

const domainItems = [
  {
    icon: (
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 17, height: 17 }}
      />
    ),
    name: "poly",
  },
  {
    icon: (
      <Image
        source={require("@/assets/images/logo.png")}
        style={{ width: 17, height: 17 }}
      />
    ),
    name: "cz",
  },
];

export default function DomainTypeSelect() {
  const [selectedDomainType, setSelectedDomainType] = useState(domainItems[0]);

  return (
    <FlatList
      data={domainItems}
      renderItem={({ item }) => (
        <DomainTypeItem
          icon={item.icon}
          name={item.name}
          isSelected={selectedDomainType.name === item.name}
          onPress={() => setSelectedDomainType(item)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    height: 60,
  },
});
