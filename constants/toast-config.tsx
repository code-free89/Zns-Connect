import { Dimensions, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "./theme";
import { getWidthSize } from "@/utils/size";

export const toastConfig = {
  success: (props: any) => (
    <View
      style={{
        backgroundColor: CustomDarkTheme.colors.grey2,
        padding: 16,
        borderRadius: 10,
        width: Dimensions.get("window").width - getWidthSize(32),
        bottom: 40,
      }}
    >
      <ZnsText type="bold" style={{ color: CustomDarkTheme.colors.primary }}>
        {props.text1}
      </ZnsText>
      {props.text2 && (
        <ZnsText style={{ color: "white" }}>{props.text2}</ZnsText>
      )}
    </View>
  ),
  error: (props: any) => (
    <View
      style={{
        backgroundColor: CustomDarkTheme.colors.grey2,
        padding: 16,
        borderRadius: 10,
        width: Dimensions.get("window").width - getWidthSize(32),
        bottom: 40,
      }}
    >
      <ZnsText type="bold" style={{ color: CustomDarkTheme.colors.error }}>
        {props.text1}
      </ZnsText>
      {props.text2 && (
        <ZnsText style={{ color: "white" }}>{props.text2}</ZnsText>
      )}
    </View>
  ),
};
