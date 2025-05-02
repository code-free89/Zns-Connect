import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import FormTextInput from "@/components/ui/forms/FormTextInput";
import InteractiveButton from "@/components/ui/InteractiveButton";
import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useTransferGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { GiftCardType } from "@/store/slices/user";
import { isValidEthereumAddress } from "@/utils/formatter";
import { showErrorToast } from "@/utils/toast";

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
      <ZnsText type="medium" style={styles.resendTitle}>
        Resend Gift Card
      </ZnsText>
      <ZnsText style={styles.resendDescription}>
        Resend gift card to another wallet address
      </ZnsText>
      <FormTextInput
        control={control}
        name="recipient_address"
        placeholder="Enter/paste the recipient address"
      />
      <InteractiveButton
        title="Resend"
        fontType="medium"
        requiredConnect
        loading={isTransferProcessing}
        textStyle={{ fontSize: 14, color: CustomDarkTheme.colors.p950 }}
        onPress={handleSubmit(onTransferGiftCard)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  resendContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: 16,
    borderRadius: 10,
    gap: 12,
  },
  resendTitle: {
    color: CustomDarkTheme.colors.txtColor,
    fontSize: 16,
  },
  resendDescription: {
    color: CustomDarkTheme.colors.body,
    marginBottom: 12,
  },
});
