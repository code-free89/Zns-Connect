import { DarkTheme, DefaultTheme } from "@react-navigation/native";

// Custom themes with modified primary color
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#ff0000", // Change this to your desired primary color
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#CAFC01", // Change this to your desired primary color for dark mode
    textPrimary: "#C9FC01",
    textDisabled: "#FFFFFF6B",
    modalBackground: "#0E1101",
    disabledBackground: "#2C3212",
    body: "#A1A1A1",
    avatarBackground: "#262626B2",
    grey1: "#E8E8E8",
    grey2: "#101010",
    actionBg: "#262626",
    txtColor: "#F4F4F5",
    gray900: "#25212B",
    secondaryBtn: "#13150A",
    caption: "#858584",
    p500: "#C9FC01",
    p700: "#698902",
    p950: "#243300",
    error: "#FF0505",
    bg: "#161616",
    stroke: "#292925",
    textBody: "#EBEDED",
    badge: "#09A7F8",
  },
  gradientColors: {
    linear1: ["#1C96FD", "#33E360", "#F4C630", "#CB1245", "#AD00FE"],
    linear2: ["#975E4D", "#628DBE", "#C244C9", "#A1A464", "#905858"],
  },
};

export { CustomLightTheme, CustomDarkTheme };
