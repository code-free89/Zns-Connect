import { getWidthSize } from "@/utils/size";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Button from "@/components/ui/Button";
import FormSelect from "@/components/ui/forms/FormSelect";
import FormTextArea from "@/components/ui/forms/FormTextArea";
import FormTextInput from "@/components/ui/forms/FormTextInput";
import { PROFILE_CATEGORY } from "@/constants/profile";
import { getHeightSize } from "@/utils/size";
import { useMemo } from "react";
import { CustomDarkTheme } from "@/constants/theme";

export default function PersonalInfo() {
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      category: "DigitalCreator",
    },
  });

  const categoryOptions = useMemo(() => {
    return Object.keys(PROFILE_CATEGORY).map((key) => ({
      value: key,
      label: key.replace(/([A-Z])/g, " $1").trim(),
    }));
  }, []);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <FormTextInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name"
        containerStyle={{ borderRadius: getWidthSize(12) }}
      />

      <FormTextInput
        control={control}
        name="location"
        label="Location"
        placeholder="Enter your location"
        containerStyle={{ borderRadius: getWidthSize(12) }}
      />

      <FormSelect
        control={control}
        name="category"
        label="Category"
        options={categoryOptions}
        containerStyle={{ borderRadius: getWidthSize(12) }}
      />

      <FormTextArea
        control={control}
        name="bio"
        label="Short bio"
        placeholder="Tell a bit about yourself"
        maxLength={160}
        containerStyle={{
          borderRadius: getWidthSize(12),
          marginBottom: getHeightSize(40),
        }}
      />

      <Button
        title="Save changes"
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
        style={{ marginTop: "auto" }}
      />

      <Button
        variant="text"
        title="Discard changes"
        onPress={() => {
          reset();
        }}
        disabled={!isDirty}
        textStyle={{ color: CustomDarkTheme.colors.error }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: getHeightSize(24),
    gap: getHeightSize(24),
  },
});
