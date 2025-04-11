import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import RegisterTypeSelect from "@/components/zns/register/RegisterTypeSelect";
import SmartSearch from "@/components/zns/register/SmartSearch";

type DomainRegisterType = "smartSearch" | "withCategories" | "generateWithAI";

export default function RegisterScreen() {
  const [selectedType, setSelectedType] =
    useState<DomainRegisterType>("smartSearch");

  return (
    <ZnsScrollView>
      <RegisterTypeSelect
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <View style={{ marginTop: 24 }}>
        <SmartSearch />
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({});
