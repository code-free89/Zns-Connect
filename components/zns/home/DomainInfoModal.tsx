import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import Button from "@/components/ui/Button";
import { CustomDarkTheme } from "@/constants/theme";
import { IZnsDomain } from "@/types/zns";
import { domainColors } from "@/constants/Colors";
type Props = {
  isVisible: boolean;
  domain: IZnsDomain;
  onClose: () => void;
};

export default function DomainInfoModal({ isVisible, onClose, domain }: Props) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={"bounceIn"}
      animationOut={"bounceOut"}
    >
      <View style={styles.modalContent}>
        {domain.icon}
        <Text style={styles.domainName}>
          {domain.name}
          <Text style={{ color: domainColors[domain.type] }}>
            .{domain.type}
          </Text>
        </Text>
        <View style={styles.primaryContainer}>
          <Text style={styles.primaryText}>Primary</Text>
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
          onPress={onClose}
          style={{ marginTop: 32 }}
          textStyle={{ fontWeight: 400 }}
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  domainName: {
    fontSize: 20,
    fontWeight: 500,
    color: "white",
  },
  primaryContainer: {
    borderColor: domainColors["poly"],
    borderWidth: 0.5,
    borderRadius: 23,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  primaryText: {
    fontSize: 12,
    fontWeight: 500,
    color: "white",
  },
  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 4,
  },
  keyText: {
    fontWeight: 400,
    fontSize: 16,
    color: CustomDarkTheme.colors.body,
  },
  valueText: {
    fontWeight: 500,
    fontSize: 16,
    color: "white",
  },
});
