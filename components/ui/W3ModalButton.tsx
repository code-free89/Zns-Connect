import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { StyleSheet } from "react-native";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { getHeightSize } from "@/utils/size";

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
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(20),
  },
});
