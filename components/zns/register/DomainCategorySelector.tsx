import { useMemo } from "react";
import { FlatList } from "react-native";

import DomainCategory from "@/components/zns/DomainCategory";
import { useAppSelector } from "@/store";

export type CategoryDataType = {
  id: number;
  banner: any;
  name: string;
  key: CategoryKey;
  // generated: number;
  taken: number;
  domains?: number;
};

export type CategoryKey =
  | "4-letter-english"
  // | "exclusive-numbers"
  | "crypto-slang"
  | "powerful-keywords"
  | "personalized-names"
  | "geographical-names"
  | "tech-innovation"
  | "luxury-prestige"
  | "cultural-symbols";

const _categories: CategoryDataType[] = [
  {
    id: 1,
    banner: require("@/assets/images/icons/category/4-letter-english.png"),
    name: "4 Letter English",
    key: "4-letter-english",
    // generated: 0,
    taken: 0,
  },
  {
    id: 2,
    banner: require("@/assets/images/icons/category/crypto-slang.png"),
    name: "Crypto Slang",
    key: "crypto-slang",
    // generated: 0,
    taken: 0,
  },
  {
    id: 3,
    banner: require("@/assets/images/icons/category/powerful-keywords.png"),
    name: "Powerful Keywords",
    key: "powerful-keywords",
    // generated: 0,
    taken: 0,
  },
  {
    id: 4,
    banner: require("@/assets/images/icons/category/personalized-names.png"),
    name: "Personalized Names",
    key: "personalized-names",
    // generated: 0,
    taken: 0,
  },
  {
    id: 5,
    banner: require("@/assets/images/icons/category/geographical-names.png"),
    name: "Geographical Names",
    key: "geographical-names",
    // generated: 0,
    taken: 0,
  },
  {
    id: 6,
    banner: require("@/assets/images/icons/category/tech-innovation.png"),
    name: "Tech & Innovation",
    key: "tech-innovation",
    // generated: 0,
    taken: 0,
  },
  {
    id: 7,
    banner: require("@/assets/images/icons/category/luxury-prestige.png"),
    name: "Luxury & Prestige",
    key: "luxury-prestige",
    // generated: 0,
    taken: 0,
  },
  {
    id: 8,
    banner: require("@/assets/images/icons/category/cultural-symbols.png"),
    name: "Cultural Symbols",
    key: "cultural-symbols",
    // generated: 0,
    taken: 0,
  },
];

type DomainCategorySelectorProps = {
  selectedCategory: CategoryDataType | null;
  setSelectedCategory: (category: CategoryDataType) => void;
};

export default function DomainCategorySelector({
  selectedCategory,
  setSelectedCategory,
}: DomainCategorySelectorProps) {
  const { categories: domainCategories } = useAppSelector(
    (state) => state.category
  );
  const categories = useMemo<CategoryDataType[]>(() => {
    return _categories.map((_category) => {
      const filtered = domainCategories.filter(
        (domainCategory) => domainCategory.key === _category.key
      );
      return filtered.length > 0
        ? {
            ..._category,
            // generated: filtered[0].generated,
            taken: filtered[0].taken,
          }
        : { ..._category };
    });
  }, [domainCategories]);
  const totalDomains = useMemo(
    () =>
      categories.reduce((prev, cur) => {
        return prev + cur.taken;
      }, 0),
    [categories]
  );

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <DomainCategory
          key={item.id}
          category={item}
          selected={selectedCategory?.id === item.id}
          onPress={() => setSelectedCategory(item)}
        />
      )}
      keyExtractor={(item) => item.name}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 14 }}
    />
  );
}
