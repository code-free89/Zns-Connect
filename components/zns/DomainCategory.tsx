import { CustomDarkTheme } from "@/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { CategoryDataType } from "@/components/zns/register/DomainCategorySelector";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";
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
        width={getWidthSize(19)}
        height={getHeightSize(19)}
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
    gap: getWidthSize(8),
    padding: getWidthSize(10),
    backgroundColor: `${CustomDarkTheme.colors.actionBg}66`,
    borderRadius: getWidthSize(12),
    borderWidth: 1,
    borderColor: "transparent",
  },
  icon: {
    width: getWidthSize(19),
    height: getWidthSize(19),
  },
  name: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: "white",
  },
  selected: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.p500,
  },
});
