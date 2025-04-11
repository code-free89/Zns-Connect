import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";

import { domainColors } from "@/constants/Colors";
import { CustomDarkTheme } from "@/constants/theme";

interface MintItemProps {
  name: string;
  type: string;
  price: string;
}

export default function MintItem({ name, type, price }: MintItemProps) {
  return (
    <View style={styles.container}>
      <AntDesign
        name="hearto"
        size={18}
        color={CustomDarkTheme.colors.primary}
      />
      <Text style={styles.name}>
        {name}
        <Text
          style={{ color: domainColors[type as keyof typeof domainColors] }}
        >
          .{type}
        </Text>
      </Text>
      <Text style={styles.price}>{price}</Text>
      <AntDesign name="right" size={13} color={CustomDarkTheme.colors.p500} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 12,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: "white",
  },
  price: {
    flex: 1,
    fontSize: 14,
    fontWeight: 600,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "right",
  },
});
