import { ActivityIndicator, StyleSheet, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import AIGeneratedDomain from "@/components/zns/AIGeneratedDomain";

type GeneratedDomainsProps = {
  generatedDomains: string[];
  isGeneratingDomains: boolean;
  chainDirection?: "up" | "down";
};

export default function GeneratedDomains({
  generatedDomains,
  isGeneratingDomains,
  chainDirection = "down",
}: GeneratedDomainsProps) {
  return isGeneratingDomains ? (
    <View style={{ flex: 1, height: 200 }}>
      <ActivityIndicator
        size={"large"}
        color={CustomDarkTheme.colors.primary}
      />
    </View>
  ) : (
    <View style={styles.container}>
      {generatedDomains.map((domain, index) => (
        <AIGeneratedDomain
          key={domain}
          domain={domain}
          index={index}
          chainDirection={chainDirection}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});
