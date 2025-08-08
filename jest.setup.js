import { setUpTests as reanimatedSetUpTests } from "react-native-reanimated";

reanimatedSetUpTests();

jest.mock("expo-font", () => ({
  isLoaded: jest.fn(() => true),
  loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const MockIcon = jest.fn((props) =>
    React.createElement("MockMaterialCommunityIcons", props, null),
  );
  return {
    __esModule: true,
    MaterialCommunityIcons: MockIcon,
  };
});
