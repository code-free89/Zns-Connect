import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import ZnsText from "@/components/ui/Text";

import Button from "@/components/ui/Button";
import GradientBorderButtonWrapper from "@/components/ui/GradientBorderButtonWrapper";
import { SearchIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";

type DomainRegisterType = "smartSearch" | "withCategories" | "generateWithAI";

interface RegisterTypeButtonProps {
  type: DomainRegisterType;
  selectedType: DomainRegisterType;
  onSelect: (type: DomainRegisterType) => void;
  label: string;
  style?: StyleProp<ViewStyle>;
}

const RegisterTypeButton = ({
  type,
  selectedType,
  onSelect,
  label,
  style,
}: RegisterTypeButtonProps) => {
  const isSelected = type === selectedType;
  const content = (
    <View
      style={[
        styles.domainRegisterTypeContainer,
        { borderWidth: isSelected ? 0 : 0.65 },
      ]}
    >
      <SearchIcon
        color={
          isSelected
            ? CustomDarkTheme.colors.primary
            : CustomDarkTheme.colors.txtColor
        }
      />
      <ZnsText
        type="regular"
        style={[
          styles.domainRegisterTypeText,
          {
            color: isSelected
              ? CustomDarkTheme.colors.p500
              : CustomDarkTheme.colors.txtColor,
          },
        ]}
      >
        {label}
      </ZnsText>
    </View>
  );

  return isSelected ? (
    <GradientBorderButtonWrapper onPress={() => onSelect(type)}>
      {content}
    </GradientBorderButtonWrapper>
  ) : (
    <Button
      variant="text"
      onPress={() => onSelect(type)}
      style={[styles.buttonBase, style]}
    >
      {content}
    </Button>
  );
};

const REGISTER_OPTIONS: Array<{ type: DomainRegisterType; label: string }> = [
  { type: "smartSearch", label: "Smart Search" },
  { type: "withCategories", label: "With Categories" },
  { type: "generateWithAI", label: "Generate with AI" },
];

interface RegisterTypeSelectProps {
  selectedType: DomainRegisterType;
  setSelectedType: (type: DomainRegisterType) => void;
}

export default function RegisterTypeSelect({
  selectedType,
  setSelectedType,
}: RegisterTypeSelectProps) {
  return (
    <View style={styles.domainGenerateContainer}>
      <RegisterTypeButton
        type="smartSearch"
        selectedType={selectedType}
        onSelect={setSelectedType}
        label="Smart Search"
        style={styles.topButton}
      />

      <View style={styles.bottomRow}>
        {REGISTER_OPTIONS.slice(1).map((option, index) => (
          <View key={option.type} style={styles.bottomButtonContainer}>
            <RegisterTypeButton
              type={option.type}
              selectedType={selectedType}
              onSelect={setSelectedType}
              label={option.label}
              style={styles.bottomButton}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  domainGenerateContainer: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.bg,
  },
  domainRegisterTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  domainRegisterTypeText: {
    fontSize: 12,
    fontWeight: "400",
  },
  buttonBase: {
    paddingVertical: 8,
  },
  topButton: {
    paddingVertical: 8,
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  bottomButtonContainer: {
    width: "50%",
    paddingHorizontal: 6,
  },
  bottomButton: {
    paddingVertical: 8,
  },
});
