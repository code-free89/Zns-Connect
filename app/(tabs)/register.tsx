import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import GenerateWithAI from "@/components/zns/register/GenerateWithAI";
import RegisterTypeSelect from "@/components/zns/register/RegisterTypeSelect";
import SmartSearch from "@/components/zns/register/SmartSearch";
import WithCategories from "@/components/zns/register/WithCategories";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import DomainProvider from "@/lib/providers/DomainProvider";

type DomainRegisterType = "smartSearch" | "withCategories" | "generateWithAI";

export default function RegisterScreen() {
  const [selectedType, setSelectedType] =
    useState<DomainRegisterType>("smartSearch");

  return (
    <>
      <ZnsScrollView>
        <View style={styles.pageTitle}>
          <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
            Register a domain
          </Text>
        </View>

        <DomainProvider />

        <RegisterTypeSelect
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <View style={{ marginTop: 24 }}>
          {selectedType === "smartSearch" && <SmartSearch />}
          {selectedType === "withCategories" && <WithCategories />}
          {selectedType === "generateWithAI" && <GenerateWithAI />}
        </View>
      </ZnsScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.txtColor,
  },
});
