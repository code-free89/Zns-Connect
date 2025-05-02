import { CustomDarkTheme } from "@/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CategoryDataType } from "@/components/zns/register/DomainCategorySelector";

interface DomainCategoryProps {
  category: CategoryDataType;
  selected: boolean;
  onPress: (category: CategoryDataType) => void;
}

export default function DomainCategory({
  category,
  selected,
  onPress,
}: DomainCategoryProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => onPress(category)}
    >
      <Image
        source={category.banner}
        width={19}
        height={19}
        style={styles.icon}
      />
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    backgroundColor: `${CustomDarkTheme.colors.actionBg}66`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  icon: {
    width: 19,
    height: 19,
  },
  name: {
    fontSize: 12,
    fontWeight: 500,
    color: "white",
  },
  selected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.p500,
  },
});
