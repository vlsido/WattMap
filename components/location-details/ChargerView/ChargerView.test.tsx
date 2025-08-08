import { Connector } from "@/types/common";
import {
  render,
  screen,
  userEvent,
  within,
} from "@testing-library/react-native";
import ChargerView from "./ChargerView";

describe("ChargerView", () => {
  const connectors: Connector[] = [
    {
      id: 1,
      connectorType: "Type 2",
      status: "UNAVAILABLE",
      maxPowerOutputKW: 22,
      priceInCentsPerKWh: 30,
    },
    {
      id: 2,
      connectorType: "CHAdeMO",
      status: "AVAILABLE",
      maxPowerOutputKW: 50,
      priceInCentsPerKWh: 40,
    },
    {
      id: 3,
      connectorType: "Combo CCS",
      status: "IN USE",
      maxPowerOutputKW: 150,
      priceInCentsPerKWh: 50,
    },
  ];
  //
  // it("renders charger ID", () => {
  //   render(
  //     <ChargerView
  //       id="CH-123"
  //       connectors={connectors}
  //       onSelectConnector={jest.fn()}
  //     />,
  //   );
  //
  //   expect(screen.getByText("Charger ID")).toBeOnTheScreen();
  //   expect(screen.getByText("CH-123")).toBeOnTheScreen();
  // });

  // it("sorts connectors so AVAILABLE ones appear first", () => {
  //   render(
  //     <ChargerView
  //       id="CH-123"
  //       connectors={connectors}
  //       onSelectConnector={jest.fn()}
  //     />,
  //   );
  //
  //   const renderedConnectors = screen.getAllByRole("button");
  //   expect(renderedConnectors[0]).toHaveTextContent(/AVAILABLE/);
  // });
  //
  it("marks connector as selected when IDs match", () => {
    render(
      <ChargerView
        id="CH-123"
        connectors={connectors}
        selectedChargerId="CH-123"
        selectedConnectorId={2}
        onSelectConnector={jest.fn()}
      />,
    );

    const firstConnector = screen.getAllByRole("button")[0];

    expect(within(firstConnector).getByText("AVAILABLE")).toBeOnTheScreen();
    expect(within(firstConnector).getByText("SELECTED")).toBeOnTheScreen();
  });
  //
  it("calls onSelectConnector when a connector is pressed", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <ChargerView
        id="CH-123"
        connectors={connectors}
        onSelectConnector={onSelect}
      />,
    );

    const firstConnector = screen.getAllByRole("button")[0];

    await user.press(firstConnector);

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 2,
        connectorType: "CHAdeMO",
        status: "AVAILABLE",
      }),
    );
  });
});
