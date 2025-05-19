import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import Button from "@/components/ui/Button";
import FormSelect from "@/components/ui/forms/FormSelect";
import FormTextArea from "@/components/ui/forms/FormTextArea";
import FormTextInput from "@/components/ui/forms/FormTextInput";
import { PROFILE_CATEGORY } from "@/constants/profile";
import { CustomDarkTheme } from "@/constants/theme";
import { updateProfile } from "@/lib/api/domain/profile";
import { useAppDispatch, useAppSelector } from "@/store";
import { setProfile } from "@/store/slices/profile";
import { getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export default function PersonalInfo() {
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { profile } = useAppSelector((state) => state.profile);
  const [isSavingInfo, setIsSavingInfo] = useState(false);

  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: profile?.name,
      location: profile?.location,
      category: profile?.category,
      bio: profile?.bio,
    },
  });

  const categoryOptions = useMemo(() => {
    return Object.keys(PROFILE_CATEGORY).map((key) => ({
      value: key,
      label: key.replace(/([A-Z])/g, " $1").trim(),
    }));
  }, []);

  const onSubmit = async (data: any) => {
    setIsSavingInfo(true);
    try {
      const res = await updateProfile(
        profile?.id,
        address?.toString() ?? "",
        data
      );
      showSuccessToast(res.data.message);
      if (res.data) {
        dispatch(setProfile(res.data.data));
      }
    } catch (err: any) {
      showErrorToast("Error saving personal info");
    } finally {
      setIsSavingInfo(false);
    }
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
        loading={isSavingInfo}
        loadingText="Saving..."
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
