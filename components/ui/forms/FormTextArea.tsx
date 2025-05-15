import { Control, Controller } from "react-hook-form";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

import TextInput from "@/components/ui/TextInput";
import { getHeightSize } from "@/utils/size";

type Props = TextInputProps & {
  label?: string;
  control: Control<any>;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function FormTextArea({
  control,
  name,
  label,
  containerStyle,
  ...props
}: Props) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextInput
          {...props}
          value={value}
          multiline={true}
          onChangeText={onChange}
          label={label}
          containerStyle={containerStyle}
          style={{
            height: getHeightSize(100),
            textAlignVertical: "top",
          }}
        />
      )}
    />
  );
}
