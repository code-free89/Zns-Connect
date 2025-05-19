import { Image, Pressable, StyleSheet, Text } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainByID } from "@/constants/web3/chains";
import { useTLD } from "@/hooks/web3/useTLD";
import { UserDomainType } from "@/store/slices/user-domains";
import { getFontSize, getWidthSize } from "@/utils/size";
import { router } from "expo-router";

type DomainListItemProps = {
  domain: UserDomainType;
  onClose: () => void;
  redirectTo?: any;
};

export default function DomainListItem({
  domain,
  onClose,
  redirectTo,
}: DomainListItemProps) {
  const chain = getChainByID(domain.chainId);
  const tld = useTLD(domain.chainId);

  const handleDomainSwitch = () => {
    onClose();
    router.replace({
      pathname: redirectTo ?? "/(tabs)/profile",
      params: {
        domain: `${domain.domainName}.${tld}`,
      },
    });
  };

  return (
    <Pressable style={styles.row} onPress={handleDomainSwitch}>
      <Image source={chain.icon} style={styles.icon} />
      <Text style={styles.domainName}>
        {domain.domainName}.{tld}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  icon: {
    width: getWidthSize(22),
    height: getWidthSize(22),
    borderRadius: 9999,
  },
  domainName: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
});
