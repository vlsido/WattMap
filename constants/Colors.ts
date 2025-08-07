/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0A7EA4";
const tintColorDark = "#FFF";

export const Colors = {
  light: {
    text: "#11181C",
    warnText: "#1256A4",
    background: "#FFF",
    border: "#151718",
    tint: tintColorLight,
    search: "#EEEBEB",
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primaryGreen: "#14AE5C",
    alternateGreen: "#1EE78D",
    primaryYellow: "#FF9500",
    primaryRed: "#ED060C",
    inUse: "#5F25FF",
    transparent: "transparent",
  },
  dark: {
    text: "#ECEDEE",
    warnText: "#FDFD96",
    background: "#151718",
    border: "#FFF",
    tint: tintColorDark,
    search: "#FFF",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primaryGreen: "#1EE78D",
    alternateGreen: "#14AE5C",
    primaryYellow: "#FFCC00",
    primaryRed: "#ED060C",
    inUse: "#B0A7FF",
    transparent: "transparent",
  },
};
