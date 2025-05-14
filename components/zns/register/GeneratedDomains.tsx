import { ActivityIndicator, StyleSheet, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import AIGeneratedDomain from "@/components/zns/AIGeneratedDomain";

type GeneratedDomainsProps = {
  generatedDomains: string[];
  isGeneratingDomains: boolean;
};

export default function GeneratedDomains({
  generatedDomains,
  isGeneratingDomains,
}: GeneratedDomainsProps) {
  return isGeneratingDomains ? (
    <View style={{ flex: 1, height: 400 }}>
      <ActivityIndicator
        size={"large"}
        color={CustomDarkTheme.colors.primary}
      />
    </View>
  ) : (
    <View style={styles.container}>
      {generatedDomains.map((domain, index) => (
        <AIGeneratedDomain key={domain} domain={domain} index={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    minHeight: 500,
  },
});
