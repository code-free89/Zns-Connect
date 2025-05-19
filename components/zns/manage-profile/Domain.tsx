import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import InteractiveButton from "@/components/ui/InteractiveButton";
import TextInput from "@/components/ui/TextInput";
import ToggleButton from "@/components/ui/ToggleButton";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainByID } from "@/constants/web3/chains";
import {
  useDomainBurn,
  useDomainRenew,
  useDomainTransfer,
  useSetPrimaryDomain,
} from "@/hooks/web3/write/useDomainSetting";
import { burnDomain } from "@/lib/api/domain/setting";
import { useAppDispatch, useAppSelector } from "@/store";
import { useInvalidateQuery } from "@/store/hooks/useInvalidateQuery";
import { updateExpirationDate } from "@/store/slices/profile";
import { getDatesFromTimestamp } from "@/utils/date";
import { getSanitizedValue, isValidEthereumAddress } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ManageDomain() {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { chainId, domainInfo, profile, domain } = useAppSelector(
    (state) => state.profile
  );
  const [reNewYear, setReNewYear] = useState(1);
  const [transferAddress, setTransferAddress] = useState<string>("");
  const [isValidAddress, setIsValidAddress] = useState(true);

  const { chain, id, registerData, reNewPrice } = useMemo(() => {
    const chain = getChainByID(chainId ?? undefined);
    const id = domainInfo?.id ?? "";
    const registerData = domainInfo?.registerData;
    const reNewPrice = BigInt(domainInfo?.reNewPrice ?? "0");

    return { chain, id, registerData, reNewPrice };
  }, [chainId, domainInfo]);

  const { invalidateUserPDomain, invalidateUserDomains } = useInvalidateQuery();
  const domainId = useMemo(() => domainInfo?.id ?? "", [chainId, domainInfo]);

  const onNavigate = () => {
    router.push("/(zns)/my-domains");
  };

  const callbackTransfer = async () => {
    if (profile?.id) {
      invalidateUserDomains();
      invalidateUserPDomain();
      onNavigate();
    }
  };

  const callbackBurn = async () => {
    if (profile?.id) {
      invalidateUserDomains();
      invalidateUserPDomain();
      await burnDomain(domainInfo?.id ?? "", chainId ?? 0, address ?? "");
      onNavigate();
    }
  };

  const callbackSetPrimary = async () => {
    if (profile?.id) {
      invalidateUserDomains();
      invalidateUserPDomain();
    }
  };

  const callbackRenew = () => {
    invalidateUserDomains();
    dispatch(updateExpirationDate(reNewYear));
    setReNewYear(1);
  };

  const { action: transferDomain, isProcessing: isTransferProcessing } =
    useDomainTransfer(id, chainId, transferAddress, callbackTransfer);

  const { action: onBurn, isProcessing: isBurnProcessing } = useDomainBurn(
    id,
    chainId,
    callbackBurn
  );

  const { action: onRenew, isProcessing: isReNewProcessing } = useDomainRenew(
    id,
    chainId,
    reNewPrice,
    reNewYear,
    callbackRenew
  );

  const { action: onSetPrimary, isProcessing: isSetPrimaryProcessing } =
    useSetPrimaryDomain(domainId, chainId, callbackSetPrimary);

  const handleTransferAddress = (value: string) => {
    if (!isValidAddress) {
      setIsValidAddress(true);
    }
    setTransferAddress(value);
  };

  const onTransfer = () => {
    if (isValidEthereumAddress(transferAddress)) {
      transferDomain();
    } else {
      setIsValidAddress(false);
    }
  };

  const onYearChange = useCallback((value: string) => {
    const amount = getSanitizedValue(value, 1);
    setReNewYear(amount);
  }, []);

  const onSell = (market?: string) => {
    if (market) {
      Linking.openURL(market);
    }
  };
  const { userPrimaryDomain } = useAppSelector((state) => state.user);

  const isPrimary = useMemo(
    () => userPrimaryDomain?.domainName === domain,
    [userPrimaryDomain, domain]
  );

  const { userDomainConfig } = useAppSelector((state) => state.user);
  const [primarySwitchButtonValue, setPrimarySwitchButtonValue] =
    useState(isPrimary);
  useEffect(() => {
    setPrimarySwitchButtonValue(domainId === userDomainConfig?.primaryDomain);
  }, [domainId, userDomainConfig]);

  return (
    <View style={styles.container}>
      <View style={styles.expireContainer}>
        <Text style={styles.expirationText}>
          Expiration:{" "}
          {registerData?.expirationDate &&
            getDatesFromTimestamp(registerData?.expirationDate).datenormal}
        </Text>
      </View>

      <View style={styles.manageContainer}>
        <Text style={styles.title}>Renew domain</Text>
        <Text style={styles.description}>
          Renew your domain with 90% discount. Enter the number of year below
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder="1"
            wrapperStyle={{ flex: 1 }}
            value={reNewYear.toString()}
            onChangeText={(text) => onYearChange(text)}
          />
          <InteractiveButton
            title="Renew"
            style={styles.actionBtn}
            textStyle={styles.actionBtnText}
            requiredChain={chainId ?? undefined}
            loading={isReNewProcessing}
            loadingText="..."
            onPress={onRenew}
          />
        </View>
      </View>

      <View style={styles.manageContainer}>
        <Text style={styles.title}>Transfer domain</Text>
        <Text style={styles.description}>
          Transfer your domain to another wallet address
        </Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Enter/Paste recipient address"
            wrapperStyle={{ flex: 1 }}
            value={transferAddress}
            onChangeText={(text) => handleTransferAddress(text)}
          />
          <InteractiveButton
            title="Transfer"
            style={styles.actionBtn}
            textStyle={styles.actionBtnText}
            requiredChain={chainId ?? undefined}
            loading={isTransferProcessing}
            loadingText="..."
            onPress={onTransfer}
          />
        </View>
      </View>

      <View style={styles.manageContainer}>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Set as primary</Text>
            <Text style={styles.description}>
              {"This will switch this domain\nto primary"}
            </Text>
          </View>

          <ToggleButton />
        </View>
      </View>

      <View style={styles.manageContainer}>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Sell domain</Text>
            <Text style={styles.description}>
              {"Sell your domain on the NFT\nmarket place"}
            </Text>
          </View>

          <Text
            style={styles.sellText}
            onPress={() => onSell(chain.sellMarket)}
          >
            Sell
          </Text>
        </View>
      </View>

      <View style={styles.manageContainer}>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>Delete account</Text>
            <Text style={styles.description}>
              {"Permanently delete\nyour domain and all\nrelated data"}
            </Text>
          </View>

          <InteractiveButton
            title="Delete"
            variant="text"
            style={{
              width: "auto",
              paddingHorizontal: getWidthSize(0),
            }}
            textStyle={styles.deleteButtonText}
            requiredChain={chainId ?? undefined}
            loading={isBurnProcessing}
            loadingText="..."
            onPress={onBurn}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: getHeightSize(24),
    gap: getHeightSize(24),
  },
  expireContainer: {
    paddingVertical: getHeightSize(11),
    backgroundColor: "#101010",
    borderRadius: getWidthSize(10),
  },
  manageContainer: {
    paddingHorizontal: getWidthSize(22),
    paddingVertical: getHeightSize(24),
    borderRadius: getWidthSize(10),
    backgroundColor: "#101010",
    gap: getHeightSize(12),
  },
  expirationText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 2,
    letterSpacing: 0.14,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(20),
    color: CustomDarkTheme.colors.txtColor,
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(12),
  },
  actionBtn: {
    width: "auto",
    paddingHorizontal: getWidthSize(16),
  },
  actionBtnText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
  leftContainer: {
    gap: getHeightSize(12),
    flex: 1,
  },
  sellText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.p500,
  },
  deleteButtonText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.error,
  },
});
