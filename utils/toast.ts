import { Toast } from "toastify-react-native";

export const showSuccessToast = (text1: string, text2?: string) => {
  Toast.show({
    type: "success",
    position: "top",
    text1,
    text2,
    useModal: true,
  });
};

export const showErrorToast = (text1: string, text2?: string) => {
  Toast.show({
    type: "error",
    position: "top",
    text1,
    text2,
    useModal: true,
  });
};
