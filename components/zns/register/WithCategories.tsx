import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import ZnsText from "@/components/ui/Text";

import DomainCategory from "@/components/zns/DomainCategory";
import GradientSlider from "@/components/zns/GradientSlider";
import { CustomDarkTheme } from "@/constants/theme";
import RecentlyMinted from "./RecentlyMinted";

const DOMAIN_CATEGORIES = [
  {
    icon: require("@/assets/images/app/categories/dictionary.png"),
    name: "Crypto Slang",
    value: "cryptoSlang",
  },
  {
    icon: require("@/assets/images/app/categories/dictionary.png"),
    name: "Powerful Keywords",
    value: "powerfulKeywords",
  },
  {
    icon: require("@/assets/images/app/categories/dictionary.png"),
    name: "Powerful keywords New",
    value: "powerfulKeywordsNew",
  },
];

const MAX_LETTERS = 24;

export default function WithCategories() {
  const [selectedCategory, setSelectedCategory] = useState(
    DOMAIN_CATEGORIES[0].value
  );
  const [numberOfLetters, setNumberOfLetters] = useState(4);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ZnsText type="medium" style={styles.headerText}>
          Categories
        </ZnsText>
        <ZnsText type="regular" style={styles.generateText}>
          Re-generate
        </ZnsText>
      </View>

      <FlatList
        data={DOMAIN_CATEGORIES}
        renderItem={({ item }) => (
          <DomainCategory
            key={item.name}
            icon={item.icon}
            name={item.name}
            value={item.value}
            selected={selectedCategory === item.value}
            onPress={() => setSelectedCategory(item.value)}
          />
        )}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 14 }}
      />

      <View style={styles.numberOfLettersContainer}>
        <View style={styles.numberOfLettersTextContainer}>
          <ZnsText type="regular" style={styles.numberOfLettersText}>
            Number of letters to generate
          </ZnsText>
          <ZnsText type="semiBold" style={styles.progressText}>
            {numberOfLetters}/{MAX_LETTERS}
          </ZnsText>
        </View>

        <GradientSlider
          initialValue={4}
          width={Dimensions.get("window").width - 54}
          max={MAX_LETTERS}
          padding={27}
        />
      </View>

      <RecentlyMinted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: 500,
    color: "white",
  },
  generateText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.p500,
  },
  numberOfLettersContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 8,
  },
  numberOfLettersTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  numberOfLettersText: {
    fontSize: 14,
    fontWeight: 400,
    color: `${CustomDarkTheme.colors.textBody}E5`,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 600,
    color: `${CustomDarkTheme.colors.textBody}E5`,
  },
});
