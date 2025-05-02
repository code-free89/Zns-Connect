import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MintItem from "@/components/zns/MintItem";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function RecentlyMinted() {
  const { domains, isLoading } = useAppSelector((state) => state.recentMinted);

  return (
    <View style={styles.container}>
      <Text style={[fontStyles["Poppins-Regular"], styles.title]}>
        Recently Minted
      </Text>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={CustomDarkTheme.colors.primary}
        />
      ) : (
        domains.map((domain) => (
          <MintItem key={domain.domainName} {...domain} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
    gap: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
});
