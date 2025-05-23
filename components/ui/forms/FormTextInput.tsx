import { Control, Controller } from "react-hook-form";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

import TextInput from "@/components/ui/TextInput";

type Props = TextInputProps & {
  label?: string;
  control: Control<any>;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function FormTextInput({
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
          onChangeText={onChange}
          label={label}
          containerStyle={containerStyle}
        />
      )}
    />
  );
}
