import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DomainTypeItemProps {
  icon: React.ReactNode;
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function DomainTypeItem({
  icon,
  name,
  isSelected,
  onPress,
}: DomainTypeItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      {icon}
      <Text style={styles.name}>.{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#26262666",
    borderRadius: 12,
    width: 87,
    height: 38,
    paddingLeft: 12,
    paddingRight: 19,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedContainer: {
    borderColor: CustomDarkTheme.colors.textPrimary,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.txtColor,
  },
});
