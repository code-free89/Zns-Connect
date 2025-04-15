import { CustomDarkTheme } from "@/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DomainCategoryProps {
  icon: any;
  name: string;
  value: string;
  selected: boolean;
  onPress: (type: string) => void;
}

export default function DomainCategory({
  icon,
  name,
  value,
  selected,
  onPress,
}: DomainCategoryProps) {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.selected]}
      onPress={() => onPress(value)}
    >
      <Image source={icon} width={19} height={19} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
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
