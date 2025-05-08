import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

import Button from "@/components/ui/Button";
import GradientBorderButtonWrapper from "@/components/ui/GradientBorderButtonWrapper";
import { fontStyles } from "@/constants/fonts";
import { BuyIcon, SearchIcon, StarIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

type DomainRegisterType = "smartSearch" | "withCategories" | "generateWithAI";

interface RegisterTypeButtonProps {
  type: DomainRegisterType;
  selectedType: DomainRegisterType;
  onSelect: (type: DomainRegisterType) => void;
  label: string;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const RegisterTypeButton = ({
  type,
  selectedType,
  onSelect,
  label,
  icon,
  style,
}: RegisterTypeButtonProps) => {
  const isSelected = type === selectedType;
  const content = (
    <View
      style={[
        styles.domainRegisterTypeContainer,
        { borderWidth: isSelected ? 0 : 0.65, borderColor: "transparent" },
      ]}
    >
      {icon}
      <Text
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
      </Text>
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

const REGISTER_OPTIONS: Array<{
  type: DomainRegisterType;
  label: string;
  icon: (color: string) => React.ReactNode;
}> = [
  {
    type: "smartSearch",
    label: "Smart Search",
    icon: (color: string) => <SearchIcon color={color} />,
  },
  {
    type: "withCategories",
    label: "With Categories",
    icon: (color: string) => <BuyIcon color={color} />,
  },
  {
    type: "generateWithAI",
    label: "Generate with AI",
    icon: (color: string) => <StarIcon />,
  },
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
        icon={
          <SearchIcon
            color={
              selectedType === "smartSearch"
                ? CustomDarkTheme.colors.p500
                : "white"
            }
          />
        }
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
              icon={option.icon(
                selectedType === option.type
                  ? CustomDarkTheme.colors.p500
                  : "white"
              )}
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
    padding: getWidthSize(6),
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.bg,
  },
  domainRegisterTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(5),
  },
  domainRegisterTypeText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
  },
  buttonBase: {
    paddingVertical: getHeightSize(8),
  },
  topButton: {
    paddingVertical: getHeightSize(8),
  },
  bottomRow: {
    flexDirection: "row",
    marginTop: getHeightSize(4),
  },
  bottomButtonContainer: {
    width: "50%",
    paddingHorizontal: getWidthSize(6),
  },
  bottomButton: {
    paddingVertical: getHeightSize(8),
  },
});
