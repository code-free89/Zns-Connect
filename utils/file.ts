import * as ImagePicker from "expo-image-picker";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateFileSize = (file: ImagePicker.ImagePickerAsset) => {
  if ((file.fileSize || 0) > MAX_FILE_SIZE) {
    return false;
  }

  return true;
};
