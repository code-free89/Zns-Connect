import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";

import AbsoluteDropdown from "@/components/ui/AbsoluteDropdown";
import DomainListView from "@/components/zns/modules/domain-switcher/DomainListView";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainByID } from "@/constants/web3/chains";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type DomainSwitcherProps = {
  containerStyle?: StyleProp<ViewStyle>;
};

export default function DomainSwitcher({
  containerStyle,
}: DomainSwitcherProps) {
  const {
    chainId: currentChainId,
    domain: currentDomain,
    tld: currentDomainTld,
    ownerDomains,
  } = useAppSelector((state) => state.profile);
  const { width } = useWindowDimensions();
  const currentChain = getChainByID(currentChainId || undefined);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Pressable
        style={[styles.selectedContainer, containerStyle]}
        onPress={() => setIsVisible((prev) => !prev)}
      >
        <Image source={currentChain?.icon} style={styles.icon} />
        <Text style={styles.domainName} numberOfLines={1}>
          {!!currentDomain ? `${currentDomain}.${currentDomainTld}` : ""}
        </Text>
        <Icon
          name="chevron-down"
          size={15}
          color={CustomDarkTheme.colors.muted200}
        />
      </Pressable>

      <AbsoluteDropdown
        isVisible={isVisible}
        onOutsideClick={() => setIsVisible(false)}
        style={{
          top: getHeightSize(34),
          right: -(getWidthSize(32) + getWidthSize(12)) * 3,
          width: width - getWidthSize(16) * 2,
        }}
      >
        <DomainListView
          domains={ownerDomains}
          onClose={() => setIsVisible(false)}
        />
      </AbsoluteDropdown>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    borderRadius: getWidthSize(8),
    backgroundColor: "#262626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: getWidthSize(10),
    gap: getWidthSize(8),
  },
  icon: {
    width: getWidthSize(18),
    height: getWidthSize(18),
    borderRadius: 9999,
  },
  domainName: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: "#fff",
    flex: 1,
    textOverflow: "ellipsis",
  },
});
