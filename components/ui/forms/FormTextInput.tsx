import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

import TextInput from "@/components/ui/TextInput";

type Props = TextInputProps & {
  label?: string;
  control: Control<any>;
  name: string;
};

export default function FormTextInput({
  control,
  name,
  label,
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
        />
      )}
    />
  );
}
