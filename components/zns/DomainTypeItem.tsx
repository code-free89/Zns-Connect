import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, NETWORKS } from "@/constants/web3/chains";
import { tlds } from "@/constants/web3/tlds";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";

interface DomainTypeItemProps {
  chainId: NETWORKS;
  isSelected: boolean;
  onPress: () => void;
}

export default function DomainTypeItem({
  chainId,
  isSelected,
  onPress,
}: DomainTypeItemProps) {
  const url = useMemo(
    () => CHAINS.find((c) => c.id === chainId)?.icon ?? "",
    [chainId]
  );

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Image source={url as any} style={styles.icon} />
      <Text style={styles.name}>
        .{tlds.find((tld) => tld.chainId === chainId)?.label ?? ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#26262666",
    borderRadius: getWidthSize(12),
    height: getHeightSize(38),
    paddingLeft: getWidthSize(12),
    paddingRight: getWidthSize(19),
    borderWidth: 1,
    borderColor: "transparent",
    gap: getWidthSize(8),
  },
  selectedContainer: {
    borderColor: CustomDarkTheme.colors.textPrimary,
  },
  name: {
    ...fontStyles["Poppins-REgular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  icon: {
    width: getWidthSize(20),
    height: getWidthSize(20),
    borderRadius: 9999,
  },
});
