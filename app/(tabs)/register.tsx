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
import { getFontSize, getHeightSize } from "@/utils/size";

type DomainRegisterType = "smartSearch" | "withCategories" | "generateWithAI";

export default function RegisterScreen() {
  const [selectedType, setSelectedType] =
    useState<DomainRegisterType>("smartSearch");

  return (
    <>
      <ZnsScrollView style={{ paddingTop: getHeightSize(0) }}>
        <View style={styles.pageTitle}>
          <Text style={styles.title}>REGISTER A DOMAIN</Text>
        </View>

        <DomainProvider />

        <RegisterTypeSelect
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <View style={{ marginTop: 16 }}>
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
    height: getHeightSize(72),
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(18),
    color: CustomDarkTheme.colors.txtColor,
  },
});
