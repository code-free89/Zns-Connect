import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import Button from "@/components/ui/Button";
import FormTextInput from "@/components/ui/forms/FormTextInput";
import InteractiveButton from "@/components/ui/InteractiveButton";
import GiftCardsView from "@/components/zns/general-settings/GiftCardsView";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useMintGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useAppSelector } from "@/store";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { isValidEthereumAddress } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast } from "@/utils/toast";

type BuyCreditsForm = {
  credits: number;
  send_amount: number;
  send_address: string;
};

export default function CreditsAndGiftCards() {
  const { address, chainId } = useAccount();
  const { userCredit } = useAppSelector((state) => state.user);
  const { updateStoreGift } = useFetchGiftCard();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      credits: 0,
      send_amount: 0,
      send_address: "",
    },
  });

  const { action: buyGiftCard, isProcessing: isBuyProcessing } =
    useMintGiftCard(
      chainId as NETWORKS,
      address ?? "",
      getValues("credits"),
      "GiftCard have been Purchased Successfully!",
      updateStoreGift
    );

  const { action: transferCredits, isProcessing: isTransferProcessing } =
    useMintGiftCard(
      chainId as NETWORKS,
      getValues("send_address"),
      getValues("send_amount"),
      "GiftCard have been Purchased Successfully!",
      updateStoreGift
    );

  const onBuyGiftCard = (data: BuyCreditsForm) => {
    if (data.credits) {
      buyGiftCard();
    } else {
      showErrorToast("Please enter credit amount");
    }
  };

  const onTransferCredits = (data: BuyCreditsForm) => {
    if (isValidEthereumAddress(data.send_address)) {
      if (data.send_amount) {
        transferCredits();
      } else {
        showErrorToast("Please enter credit amount");
      }
    } else {
      showErrorToast("Please enter valid recipient address");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <Text style={styles.title}>Buy credits</Text>
        <View style={styles.creditContainer}>
          <Text style={styles.key}>Current credits</Text>
          <Button
            title={`${userCredit} credits`}
            style={styles.creditButton}
            textStyle={styles.creditText}
          />
        </View>
        <FormTextInput
          control={control}
          name="credits"
          label="Buy credits"
          placeholder="0"
        />
        <InteractiveButton
          title="Buy credits"
          loading={isBuyProcessing}
          onPress={handleSubmit(onBuyGiftCard)}
          requiredConnect
        />
      </View>

      <View style={styles.creditsContainer}>
        <Text style={styles.title}>Send credits</Text>
        <FormTextInput
          control={control}
          name="send_amount"
          placeholder="0"
          label="Enter amount and address to send to"
        />
        <FormTextInput
          control={control}
          name="send_address"
          placeholder="Enter address to send credits"
        />
        <InteractiveButton
          title="Transfer"
          loading={isTransferProcessing}
          onPress={handleSubmit(onTransferCredits)}
          requiredConnect
        />
      </View>

      <GiftCardsView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getHeightSize(24),
    gap: getHeightSize(24),
  },
  creditsContainer: {
    padding: getWidthSize(16),
    gap: getHeightSize(12),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(10),
  },
  creditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.txtColor,
  },
  key: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  creditButton: {
    borderRadius: getWidthSize(12),
    width: "auto",
    backgroundColor: "#05ABFF",
    paddingHorizontal: getWidthSize(15),
    paddingVertical: getHeightSize(11),
  },
  creditText: {
    color: "#243300",
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
  },
});
