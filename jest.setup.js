import "react-native-gesture-handler/jestSetup";

import { setUpTests as reanimatedSetUpTests } from "react-native-reanimated";

reanimatedSetUpTests();

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
}));
