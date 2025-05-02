import {
  CategoryDataType,
  CategoryKey,
} from "@/components/zns/register/DomainCategorySelector";
import { generateAIDomains } from "@/utils/generateAIDomains";
import { useCallback, useEffect, useMemo, useState } from "react";

const prompts = new Map<CategoryKey, string>([
  ["4-letter-english", `It should be made of 4 english letters.`],
  // ["exclusive-numbers", `It should be exclusive numbers`],
  ["crypto-slang", `It should be crypto slang`],
  ["powerful-keywords", `It should be powerful keywords`],
  ["personalized-names", `It should be personalized names.`],
  ["geographical-names", `It should be geographical names`],
  ["tech-innovation", `It sounds like technical or innovative.`],
  ["luxury-prestige", `It sounds like luxury prestige.`],
  ["cultural-symbols", `It should be cultural symbols.`],
]);

export const useCategoryAIDomains = ({
  category,
  count,
  lettersToGenerate,
}: {
  category: CategoryDataType | null;
  count: number;
  lettersToGenerate: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domains, setDomains] = useState<string[]>([]);

  const getDomainsWithAI = useCallback(
    async (_prompt: string) => {
      setIsLoading(true);

      const { err, generatedDomains } = await generateAIDomains(_prompt);
      setError(err);
      setDomains(generatedDomains.slice(0, count));
      setIsLoading(false);

      // if (err === null) {
      //   updateDomainCategories({ key: category!.key, generated: count });
      // }
    },
    [/* category, */ count]
  );

  const prompt = useMemo(
    () =>
      category
        ? `Please generate ${count} nice domain names made of ${lettersToGenerate} letters, based on this rule. RULE<${prompts.get(
            category.key
          )}>. As your response, give me the string of domain names joined with comma in one line. Only include that string in your response, nothing else! And for each domain, only include its name, not index or ".com" or kind of stuff.`
        : ``,
    [category, count, lettersToGenerate]
  );

  useEffect(() => {
    !isLoading && category !== null && getDomainsWithAI(prompt);
  }, [category]);

  return { isLoading, error, domains };
};
