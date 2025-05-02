import ZnsText from "@/components/ui/Text";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import DomainCategorySelector, {
  CategoryDataType,
} from "@/components/zns/register/DomainCategorySelector";
import GeneratedDomains from "@/components/zns/register/GeneratedDomains";
import RecentlyMinted from "@/components/zns/register/RecentlyMinted";
import { CustomDarkTheme } from "@/constants/theme";
import { useCategoryAIDomains } from "@/hooks/useCategoryAIDomains";
import { showErrorToast } from "@/utils/toast";

const MAX_LETTERS = 24;

export default function WithCategories() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDataType | null>(null);
  const [lettersToGenerate, setLettersToGenerate] = useState(4);
  const {
    isLoading: isGeneratingDomains,
    error,
    domains: generatedDomains,
  } = useCategoryAIDomains({
    category: selectedCategory,
    count: 5,
    lettersToGenerate:
      selectedCategory?.key === "4-letter-english" ? 4 : lettersToGenerate,
  });

  const onSelectCategory = useCallback(
    (category: CategoryDataType) => {
      if (!isGeneratingDomains) {
        setSelectedCategory(category);
        // const urlParams = new URLSearchParams(searchParams);
        // urlParams.set("category", category.key);
        // router.push(`${pathname}?${urlParams}`, {
        //   scroll: false,
        // });
      }
    },
    [isGeneratingDomains]
  );

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ZnsText type="medium" style={styles.headerText}>
          Categories
        </ZnsText>
        {selectedCategory && (
          <ZnsText
            type="regular"
            style={styles.generateText}
            onPress={() => setSelectedCategory({ ...selectedCategory })}
          >
            Re-generate
          </ZnsText>
        )}
      </View>

      <DomainCategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={onSelectCategory}
      />

      <View style={styles.numberOfLettersContainer}>
        <View style={styles.numberOfLettersTextContainer}>
          <ZnsText type="regular" style={styles.numberOfLettersText}>
            Number of letters to generate
          </ZnsText>
          <ZnsText type="semiBold" style={styles.progressText}>
            {lettersToGenerate}/{MAX_LETTERS}
          </ZnsText>
        </View>

        {/* <GradientSlider
          initialValue={4}
          width={Dimensions.get("window").width - 54}
          max={MAX_LETTERS}
          padding={27}
        /> */}
      </View>

      <GeneratedDomains
        generatedDomains={generatedDomains}
        isGeneratingDomains={isGeneratingDomains}
      />

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
