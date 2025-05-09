import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import TextInput from "@/components/ui/TextInput";
import GradientSlider from "@/components/zns/GradientSlider";
import EmptyResult from "@/components/zns/register/generate-with-ai/EmptyResult";
import GeneratedDomains from "@/components/zns/register/GeneratedDomains";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAIDomains } from "@/hooks/useAIDomains";
import { getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast } from "@/utils/toast";

const MAX_LETTERS = 24;
const PRO_GENERATE_LIMIT = 5;

export default function GenerateWithAI() {
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [lettersToGenerate, setLettersToGenerate] = useState(4);
  const [numberOfWords, setNumberOfWords] = useState(3);
  const [showNumberOfWords, setShowNumberOfWords] = useState(false);

  const handleAddKeyword = () => {
    if (keyword) {
      setKeywords([...keywords, keyword]);
      setKeyword("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleOpenNumberOfWords = () => {
    setShowNumberOfWords((prev) => !prev);
  };

  const handleSetNumberOfWords = (numberOfWords: number) => {
    setNumberOfWords(numberOfWords);
    setShowNumberOfWords(false);
  };

  const [generateTrigger, setGenerateTrigger] = useState<null | boolean>(null);
  const GenerateAIDomains = useCallback(() => {
    if (numberOfWords < PRO_GENERATE_LIMIT) {
      setGenerateTrigger((prev) => !prev);
    }
  }, [numberOfWords]);

  const {
    isLoading: isGeneratingDomains,
    error,
    domains: generatedDomains,
  } = useAIDomains({
    tags: keywords,
    count: numberOfWords,
    lettersToGenerate,
    generateTrigger,
  });

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Provide up to 5 related keywords, and our AI will craft unique, tailored
        domain names for you.
      </Text>

      <View style={styles.keywordInputContainer}>
        <View style={{ flex: 1 }}>
          <TextInput
            label="Keyword(s)"
            placeholder="Type keywords..."
            placeholderTextColor={CustomDarkTheme.colors.body}
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={handleAddKeyword}
          />
        </View>
      </View>

      <GradientBorderViewWrapper style={{ marginTop: 16, marginBottom: 24 }}>
        <View style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordItem}>
              <Text style={styles.keyword}>{keyword}</Text>
              <Pressable onPress={() => handleRemoveKeyword(index)}>
                <Text style={styles.removeKeyword}>X</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </GradientBorderViewWrapper>

      <View style={styles.numberOfLettersContainer}>
        <View style={styles.numberOfLettersTextContainer}>
          <Text style={styles.numberOfLettersText}>
            Number of letters to generate
          </Text>
          <Text style={styles.progressText}>
            {lettersToGenerate}/{MAX_LETTERS}
          </Text>
        </View>

        <GradientSlider
          initialValue={4}
          maxValue={MAX_LETTERS}
          onChangeValue={(value) => setLettersToGenerate(value)}
          containerWidth={Dimensions.get("window").width - 54}
        />
      </View>

      <View style={styles.generateDomainsContainer}>
        <Pressable
          style={styles.numberOfWordsContainer}
          onPress={handleOpenNumberOfWords}
        >
          <Text style={styles.numberOfWordsText}>
            Generate words {numberOfWords}
          </Text>
          <Icon
            name="chevron-down"
            size={21}
            color={CustomDarkTheme.colors.body}
            style={{ position: "absolute", right: 8 }}
          />
          {showNumberOfWords && (
            <View style={styles.numberOfWordsModal}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <Pressable
                    style={styles.numberOfWordsModalItem}
                    onPress={() => handleSetNumberOfWords(index + 1)}
                  >
                    <Text style={styles.numberOfWordsModalItemText}>
                      Generate Words{" "}
                      {index + 1 === PRO_GENERATE_LIMIT ? index + 1 : ""}
                    </Text>

                    {index + 1 === PRO_GENERATE_LIMIT ? (
                      <GradientBorderViewWrapper borderRadius={8}>
                        <View
                          style={{
                            backgroundColor: CustomDarkTheme.colors.grey2,
                            borderRadius: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}
                        >
                          <Text style={styles.proGenerateText}>✨ Pro</Text>
                        </View>
                      </GradientBorderViewWrapper>
                    ) : (
                      <Text style={styles.numberOfWordsModalItemText}>
                        {index + 1}
                      </Text>
                    )}
                  </Pressable>
                ))}
            </View>
          )}
        </Pressable>
        <Button
          style={{ flex: 1, paddingVertical: 11, paddingHorizontal: 0 }}
          onPress={GenerateAIDomains}
        >
          <Text style={styles.generateDomains}>Generate domains</Text>
        </Button>
      </View>

      <Text style={styles.resultsTitle}>Results</Text>
      {generatedDomains.length === 0 && !isGeneratingDomains && <EmptyResult />}
      <GeneratedDomains
        generatedDomains={generatedDomains}
        isGeneratingDomains={isGeneratingDomains}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
    color: CustomDarkTheme.colors.body,
    paddingHorizontal: getWidthSize(26),
    textAlign: "center",
    marginBottom: getHeightSize(16),
  },
  keywordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(12),
  },
  keywordsContainer: {
    paddingHorizontal: getWidthSize(15),
    paddingVertical: getHeightSize(20),
    backgroundColor: "black",
    borderRadius: getWidthSize(12),
    height: getHeightSize(150),
    flexDirection: "row",
    flexWrap: "wrap",
    gap: getWidthSize(8),
  },
  keywordItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#333526",
    borderRadius: 32,
  },
  keyword: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    color: CustomDarkTheme.colors.txtColor,
  },
  removeKeyword: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    color: CustomDarkTheme.colors.txtColor,
  },
  numberOfLettersContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(11),
    borderRadius: getWidthSize(8),
    paddingTop: getHeightSize(7),
    paddingBottom: getHeightSize(16),
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
  generateDomainsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(18),
    marginTop: getHeightSize(40),
  },
  numberOfWordsContainer: {
    flex: 1,
    backgroundColor: "#161616",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getWidthSize(12),
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#292925C4",
    zIndex: 1000,
  },
  generateDomains: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.p950,
  },
  numberOfWordsText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
    color: "#A5A5A5",
  },
  resultsTitle: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(18),
    lineHeight: getHeightSize(18 * 1.5),
    color: "white",
    marginTop: getHeightSize(40),
    marginBottom: getHeightSize(20),
  },
  numberOfWordsModal: {
    position: "absolute",
    left: 0,
    top: 50,
    backgroundColor: "black",
    borderRadius: getWidthSize(12),
    padding: getWidthSize(12),
    borderColor: "#292925C4",
    borderWidth: 2,
    gap: getWidthSize(8),
  },
  numberOfWordsModalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(8),
    borderRadius: getWidthSize(12),
    gap: getWidthSize(12),
  },
  numberOfWordsModalItemText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.txtColor,
  },
  proGenerateText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(10),
    lineHeight: getHeightSize(10 * 1.5),
    color: CustomDarkTheme.colors.txtColor,
  },
});
