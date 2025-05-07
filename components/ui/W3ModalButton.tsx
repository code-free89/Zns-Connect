import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { StyleSheet } from "react-native";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function W3ModalButton() {
  const { open } = useWeb3Modal();

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
    fontSize: getWidthSize(14),
    lineHeight: getHeightSize(20),
  },
});
