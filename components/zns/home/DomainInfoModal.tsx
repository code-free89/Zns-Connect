import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import Button from "@/components/ui/Button";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, getChainColor } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { UserDomainType } from "@/store/slices/user-domains";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { Image } from "react-native";

type Props = {
  isVisible: boolean;
  domain: UserDomainType;
  onClose: () => void;
};

export default function DomainInfoModal({ isVisible, onClose, domain }: Props) {
  const { chainId, domainName, isPrimary } = domain;
  const chain = CHAINS.find((chain) => chain.id === chainId);
  const tld = useTLD(chainId);

  const handleViewProfile = () => {
    onClose();
    router.push({
      pathname: "/(tabs)/profile",
      params: {
        domain: `${domainName}.${tld}`,
      },
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <View style={styles.modalContent}>
        <View style={{ alignItems: "center", gap: getHeightSize(16) }}>
          <Image source={chain?.icon} style={styles.domainIcon} />
          <Text style={styles.domainName}>
            {domainName}
            <Text style={{ color: getChainColor(chainId) }}>.{tld}</Text>
          </Text>
          {isPrimary && (
            <View
              style={[
                styles.primaryContainer,
                { borderColor: getChainColor(chainId) },
              ]}
            >
              <Text style={styles.primaryText}>Primary</Text>
            </View>
          )}
        </View>

        <View style={styles.valueContainer}>
          <Text style={styles.keyText}>Registrant</Text>
          <Text style={styles.valueText}>0x4bC9...e69f</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.keyText}>Expiration</Text>
          <Text style={styles.valueText}>11-02-2026</Text>
        </View>

        <Button
          title="View Profile"
          style={{ marginTop: 32 }}
          onPress={handleViewProfile}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: getWidthSize(24),
    paddingVertical: getHeightSize(16),
    gap: getHeightSize(20),
  },
  domainIcon: {
    width: getWidthSize(26),
    height: getWidthSize(26),
    borderRadius: 9999,
  },
  domainName: {
    ...fontStyles["WorkSans-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.4,
    color: "white",
  },
  primaryContainer: {
    borderWidth: 0.5,
    borderRadius: 23,
    paddingVertical: getHeightSize(2),
    paddingHorizontal: getWidthSize(6),
  },
  primaryText: {
    ...fontStyles["WorkSans-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: "white",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  keyText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  valueText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: "white",
  },
});
