import { TextStyle, TouchableOpacityProps } from "react-native";
import { useAccount, useSwitchChain } from "wagmi";

import Button from "@/components/ui/Button";
import { W3mButton } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";

interface InteractiveButtonProps extends TouchableOpacityProps {
  fontType?: "regular" | "medium" | "semiBold" | "bold";
  title?: string;
  textStyle?: TextStyle;
  variant?: "primary" | "secondary" | "outline" | "text";
  loading?: boolean;
  loadingText?: string;
  requiredConnect?: boolean;
  requiredChain?: number;
  keepContent?: boolean;
  children?: React.ReactNode;
  error?: { isError: boolean; text: string };
}

export default function InteractiveButton({
  requiredConnect = false,
  requiredChain,
  keepContent,
  children,
  error,
  ...props
}: InteractiveButtonProps) {
  const { chainId, address } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  if (!address && (requiredConnect || requiredChain)) {
    return (
      <W3mButton
        connectStyle={{
          backgroundColor: CustomDarkTheme.colors.primary,
          borderRadius: 11,
          height: 50,
        }}
        label="Connect Wallet"
      />
    );
  }

  const handleSwitchNetwork = async () => {
    try {
      if (requiredChain && chainId !== requiredChain) {
        await switchChainAsync({ chainId: requiredChain });
      }
    } catch (e) {}
  };

  if (requiredChain && requiredChain !== chainId) {
    return (
      <Button
        {...props}
        title={keepContent ? undefined : "Switch Network"}
        onPress={handleSwitchNetwork}
      >
        {keepContent && children}
      </Button>
    );
  }

  if (error?.isError) {
    return (
      <Button variant="secondary" {...props} title={error.text} disabled />
    );
  }

  return <Button {...props}>{keepContent && children}</Button>;
}
