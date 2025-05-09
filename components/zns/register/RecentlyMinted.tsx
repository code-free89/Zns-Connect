import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import MintItem from "@/components/zns/MintItem";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function RecentlyMinted() {
  const { domains, isLoading } = useAppSelector((state) => state.recentMinted);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Recently Minted</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={CustomDarkTheme.colors.primary}
        />
      ) : (
        domains.map((domain, index) => (
          <MintItem key={`mint_${index}`} {...domain} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: getHeightSize(14),
  },
  title: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(18),
    lineHeight: getHeightSize(18 * 1.6),
    color: CustomDarkTheme.colors.txtColor,
  },
  titleContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#26262666",
    borderColor: "#C9FC0180",
    paddingVertical: getHeightSize(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: getHeightSize(15),
  },
});
