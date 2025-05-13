import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { useAccount } from "wagmi";

import AddressQRModal from "@/components/zns/home/AddressQRModal";
import { fontStyles } from "@/constants/fonts";
import { BuyIcon, ReceiveIcon, SendIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

const ActionButton = ({
  children,
  style,
  ...props
}: PressableProps & {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <Pressable {...props} style={[styles.button, style]}>
      {children}
    </Pressable>
  );
};

export default function ActionButtons() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { address } = useAccount();

  return (
    <View style={styles.container}>
      <ActionButton
        style={{ borderColor: "#C9FC0180" }}
        onPress={() => router.push("/(tabs)/register")}
      >
        <BuyIcon />
        <Text style={styles.buttonText}>Register</Text>
      </ActionButton>

      <ActionButton
        style={{ borderColor: "#09A7F880" }}
        onPress={() =>
          router.push({
            pathname: "/(zns)/general-settings",
            params: {
              source: "credits",
            },
          })
        }
      >
        <SendIcon />
        <Text style={styles.buttonText}>Send</Text>
      </ActionButton>

      <ActionButton
        style={{ borderColor: "#F4C63080" }}
        onPress={() => setIsModalVisible(true)}
      >
        <ReceiveIcon />
        <Text style={styles.buttonText}>Receive</Text>
      </ActionButton>

      <AddressQRModal
        address={address || ""}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: getWidthSize(14),
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
    borderWidth: 1,
  },
  buttonText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.grey1,
  },
});
