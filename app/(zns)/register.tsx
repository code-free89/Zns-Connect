import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import RegisterTypeSelect from "@/components/zns/register/RegisterTypeSelect";
import SmartSearch from "@/components/zns/register/SmartSearch";
import WithCategories from "@/components/zns/register/WithCategories";
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
        {selectedType === "smartSearch" && <SmartSearch />}
        {selectedType === "withCategories" && <WithCategories />}
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({});
