import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { BuyIcon, ReceiveIcon, SendIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

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
    gap: getWidthSize(8),
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingVertical: getHeightSize(12),
    borderRadius: 14,
    gap: getWidthSize(12),
  },
  buttonText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
    color: CustomDarkTheme.colors.grey1,
  },
});
