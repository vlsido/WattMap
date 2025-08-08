import { render } from "@testing-library/react-native";
import ConnectorIcon from "./ConnectorIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ConnectorStatus, ConnectorType } from "@/types/common";

describe("ConnectorIcon", () => {
  it.each<[ConnectorType, ConnectorStatus, string, string]>([
    ["Type 2", "AVAILABLE", "ev-plug-type2", Colors.light.primaryGreen],
    ["Type 2", "IN USE", "ev-plug-type2", Colors.light.inUse],
    ["Type 2", "UNAVAILABLE", "ev-plug-type2", Colors.light.primaryRed],
    ["CHAdeMO", "AVAILABLE", "ev-plug-chademo", Colors.light.primaryGreen],
    ["Combo CCS", "AVAILABLE", "ev-plug-ccs2", Colors.light.primaryGreen],
  ])(
    "renders %s connector with status %s using icon %s and color %s",
    (type, status, expectedName, expectedColor) => {
      render(<ConnectorIcon type={type} status={status} size={42} />);

      expect(MaterialCommunityIcons).toHaveBeenCalledWith(
        expect.objectContaining({
          name: expectedName,
          color: expectedColor,
          size: 42,
        }),
        undefined,
      );
    },
  );

  it("renders without crashing for all connector types", () => {
    const types: ConnectorType[] = ["Type 2", "CHAdeMO", "Combo CCS"];

    types.forEach((type) => {
      render(<ConnectorIcon type={type} status="AVAILABLE" size={24} />);
    });
  });
});
