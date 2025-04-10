import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BuyIcon, ReceiveIcon, SendIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";

const ActionButton = ({ children }: { children: React.ReactNode }) => {
  return <TouchableOpacity style={styles.button}>{children}</TouchableOpacity>;
};

export default function ActionButtons() {
  return (
    <View style={styles.container}>
      <ActionButton>
        <SendIcon />
        <Text style={styles.buttonText}>Send</Text>
      </ActionButton>
      <ActionButton>
        <ReceiveIcon />
        <Text style={styles.buttonText}>Receive</Text>
      </ActionButton>
      <ActionButton>
        <BuyIcon />
        <Text style={styles.buttonText}>Buy</Text>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.grey1,
  },
});
