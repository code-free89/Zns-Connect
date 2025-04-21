import { Toast } from "toastify-react-native";

export const showSuccessToast = (text1: string, text2?: string) => {
  Toast.show({
    type: "success",
    position: "bottom",
    text1,
    text2,
    useModal: true,
  });
};
