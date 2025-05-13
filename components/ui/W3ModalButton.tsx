import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { StyleSheet } from "react-native";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { getFontSize } from "@/utils/size";

export default function W3ModalButton() {
  const { open } = useAppKit();

  return (
    <Button
      title="Connect Wallet"
      textStyle={styles.W3ButtonText}
      onPress={() => open()}
    />
  );
}

const styles = StyleSheet.create({
  W3ButtonText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
});
