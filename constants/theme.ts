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
  },
};

export { CustomLightTheme, CustomDarkTheme };
