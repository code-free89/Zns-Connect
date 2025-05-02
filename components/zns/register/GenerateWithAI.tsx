import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import TextInput from "@/components/ui/TextInput";
import EmptyResult from "@/components/zns/register/generate-with-ai/EmptyResult";
import GeneratedDomains from "@/components/zns/register/GeneratedDomains";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAIDomains } from "@/hooks/useAIDomains";
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
      <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
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
          />
        </View>
        <Text
          style={[fontStyles["Poppins-Medium"], styles.addKeyword]}
          onPress={handleAddKeyword}
        >
          Add
        </Text>
      </View>

      <GradientBorderViewWrapper style={{ marginTop: 16, marginBottom: 24 }}>
        <View style={styles.keywordsContainer}>
          {keywords.map((keyword, index) => (
            <View key={index} style={styles.keywordItem}>
              <Text style={(fontStyles["Poppins-Medium"], styles.keyword)}>
                {keyword}
              </Text>
              <Pressable onPress={() => handleRemoveKeyword(index)}>
                <Text style={styles.removeKeyword}>X</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </GradientBorderViewWrapper>

      <View style={styles.numberOfLettersContainer}>
        <View style={styles.numberOfLettersTextContainer}>
          <Text
            style={[fontStyles["Poppins-Regular"], styles.numberOfLettersText]}
          >
            Number of letters to generate
          </Text>
          <Text style={[fontStyles["Poppins-SemiBold"], styles.progressText]}>
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

      <View style={styles.generateDomainsContainer}>
        <Pressable
          style={styles.numberOfWordsContainer}
          onPress={handleOpenNumberOfWords}
        >
          <Text
            style={[fontStyles["Poppins-Regular"], styles.numberOfWordsText]}
          >
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
                    <Text
                      style={[
                        fontStyles["Poppins-Medium"],
                        styles.numberOfWordsModalItemText,
                      ]}
                    >
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
                          <Text
                            style={[
                              fontStyles["Poppins-Medium"],
                              styles.proGenerateText,
                            ]}
                          >
                            ✨ Pro
                          </Text>
                        </View>
                      </GradientBorderViewWrapper>
                    ) : (
                      <Text
                        style={[
                          fontStyles["Poppins-Medium"],
                          styles.numberOfWordsModalItemText,
                        ]}
                      >
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
          <Text style={[fontStyles["Poppins-Medium"], styles.generateDomains]}>
            Generate domains
          </Text>
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
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
    paddingHorizontal: 26,
    textAlign: "center",
    marginBottom: 16,
  },
  keywordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  addKeyword: {
    fontSize: 16,
    color: CustomDarkTheme.colors.primary,
    marginTop: 30,
  },
  keywordsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "black",
    borderRadius: 12,
    height: 150,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
  },
  removeKeyword: {
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
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
  generateDomainsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 40,
  },
  numberOfWordsContainer: {
    flex: 1,
    backgroundColor: "#161616",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#292925C4",
    zIndex: 1000,
  },
  generateDomains: {
    color: CustomDarkTheme.colors.p950,
    fontSize: 14,
  },
  numberOfWordsText: {
    fontSize: 12,
    color: "#A5A5A5",
  },
  resultsTitle: {
    fontSize: 18,
    color: "white",
    marginTop: 40,
    marginBottom: 20,
  },
  numberOfWordsModal: {
    position: "absolute",
    left: 0,
    top: 50,
    backgroundColor: "black",
    borderRadius: 12,
    padding: 12,
    borderColor: "#292925C4",
    borderWidth: 2,
    gap: 8,
  },
  numberOfWordsModalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 12,
  },
  numberOfWordsModalItemText: {
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
  },
  proGenerateText: {
    fontSize: 10,
    color: CustomDarkTheme.colors.txtColor,
  },
});
