import { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, NETWORKS } from "@/constants/web3/chains";
import { tlds } from "@/constants/web3/tlds";

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
    borderRadius: 12,
    height: 38,
    paddingLeft: 12,
    paddingRight: 19,
    borderWidth: 1,
    borderColor: "transparent",
    gap: 8,
  },
  selectedContainer: {
    borderColor: CustomDarkTheme.colors.textPrimary,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: CustomDarkTheme.colors.txtColor,
  },
  icon: {
    width: 17,
    height: 17,
    borderRadius: 9999,
  },
});
