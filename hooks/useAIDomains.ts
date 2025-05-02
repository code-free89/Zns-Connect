import { useCallback, useEffect, useMemo, useState } from "react";

import { generateAIDomains } from "@/utils/generateAIDomains";

export const useAIDomains = ({
  tags,
  count,
  generateTrigger,
  lettersToGenerate,
}: {
  tags: string[];
  count: number;
  generateTrigger: null | boolean;
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
    },
    [count]
  );

  const prompt = useMemo(
    () =>
      count === 1
        ? `Please generate a nice domain name made of ${lettersToGenerate} letters, based on the meaning of these keywords - "${tags.join(
            ","
          )}". In your response, only include domain name, nothing else! And only include its name, not ".com" or kind of stuff.`
        : `Please generate ${count} nice domain names made of ${lettersToGenerate} letters, based on the meaning of these keywords - "${tags.join(
            ","
          )}". As your response, give me the string of domain names joined with comma in one line. Only include that string in your response, nothing else! And for each domain, only include its name, not index or ".com" or kind of stuff.`,
    [tags, count, lettersToGenerate]
  );

  useEffect(() => {
    generateTrigger !== null &&
      !isLoading &&
      tags.length > 0 &&
      getDomainsWithAI(prompt);
  }, [generateTrigger]);

  return { isLoading, error, domains };
};
