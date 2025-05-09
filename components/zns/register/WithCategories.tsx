import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DomainCategorySelector, {
  CategoryDataType,
} from "@/components/zns/register/DomainCategorySelector";
import GeneratedDomains from "@/components/zns/register/GeneratedDomains";
import RecentlyMinted from "@/components/zns/register/RecentlyMinted";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useCategoryAIDomains } from "@/hooks/useCategoryAIDomains";
import { getHeightSize, getWidthSize } from "@/utils/size";
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
        <Text style={styles.headerText}>Categories</Text>
        {selectedCategory && (
          <Text
            style={styles.generateText}
            onPress={() => setSelectedCategory({ ...selectedCategory })}
          >
            Re-generate
          </Text>
        )}
      </View>

      <DomainCategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={onSelectCategory}
      />

      <View style={styles.numberOfLettersContainer}>
        <View style={styles.numberOfLettersTextContainer}>
          <Text style={styles.numberOfLettersText}>
            Number of letters to generate
          </Text>
          <Text style={styles.progressText}>
            {lettersToGenerate}/{MAX_LETTERS}
          </Text>
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
    gap: getHeightSize(12),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(18),
    lineHeight: getHeightSize(18 * 1.5),
    color: "white",
  },
  generateText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.p500,
  },
  numberOfLettersContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(11),
    paddingVertical: getHeightSize(7),
    borderRadius: getWidthSize(8),
  },
  numberOfLettersTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: getHeightSize(6),
  },
  numberOfLettersText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: `${CustomDarkTheme.colors.textBody}E5`,
  },
  progressText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.5),
    color: `${CustomDarkTheme.colors.textBody}E5`,
  },
});
