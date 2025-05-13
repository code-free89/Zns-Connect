import { useForm } from "react-hook-form";
import { StyleSheet, View, Text } from "react-native";
import { useAccount } from "wagmi";

import FormTextInput from "@/components/ui/forms/FormTextInput";
import InteractiveButton from "@/components/ui/InteractiveButton";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useTransferGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { GiftCardType } from "@/store/slices/user";
import { isValidEthereumAddress } from "@/utils/formatter";
import { showErrorToast } from "@/utils/toast";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";

type ResendGiftCardSectionProps = {
  giftCard?: GiftCardType;
};

export default function ResendGiftCardSection({
  giftCard,
}: ResendGiftCardSectionProps) {
  const { chainId } = useAccount();
  const { updateStoreGift } = useFetchGiftCard();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      recipient_address: "",
    },
  });

  const { action: transferGiftCard, isProcessing: isTransferProcessing } =
    useTransferGiftCard(
      chainId as NETWORKS,
      giftCard?.id ?? "",
      getValues("recipient_address"),
      "GiftCard have been Transferred Successfully!",
      updateStoreGift
    );

  const onTransferGiftCard = (data: { recipient_address: string }) => {
    if (isValidEthereumAddress(data.recipient_address)) {
      if (Number(giftCard?.credits)) {
        transferGiftCard();
      } else {
        showErrorToast("Please enter credit amount");
      }
    } else {
      showErrorToast("Please enter valid recipient address");
    }
  };

  return (
    <View style={styles.resendContainer}>
      <Text style={styles.resendTitle}>Resend Gift Card</Text>
      <Text style={styles.resendDescription}>
        Resend gift card to another wallet address
      </Text>
      <FormTextInput
        control={control}
        name="recipient_address"
        placeholder="Enter/paste the recipient address"
      />
      <InteractiveButton
        title="Resend"
        requiredConnect
        loading={isTransferProcessing}
        textStyle={{
          fontSize: getFontSize(14),
          lineHeight: getFontSize(14) * 1.5,
          color: CustomDarkTheme.colors.p950,
        }}
        onPress={handleSubmit(onTransferGiftCard)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resendContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getWidthSize(16),
    borderRadius: getWidthSize(10),
    gap: getWidthSize(12),
  },
  resendTitle: {
    ...fontStyles["Poppins-Medium"],
    color: CustomDarkTheme.colors.txtColor,
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
  },
  resendDescription: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.body,
    marginBottom: getHeightSize(12),
  },
});
