import React from "react";
import { render, screen } from "@testing-library/react-native";
import Charging from "../../app/charging";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ dismissAll: jest.fn() }),
  useLocalSearchParams: () => ({
    locationName: "Test Location",
    chargerId: "CH-123",
    connector: JSON.stringify({
      id: "conn-1",
      connectorType: "Type2",
      maxPowerOutputKW: 50,
    }),
  }),
}));

jest.mock("@/api/api", () => ({
  startCharging: jest.fn(() => Promise.resolve("session-1")),
  stopCharging: jest.fn(),
  getSessionState: jest.fn(),

  user: {
    id: 1,
    firstName: "Vladislav",
    lastName: "Sidorenko",
    vehicle: {
      name: "Tesla Model 3",
      batteryCapacityKWh: 40,
      consumptionKWhPer100Km: 17,
      maxChargeKW: 50,
      initialSoC: 40,
    },
  },
}));

jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

describe("Charging Screen", () => {
  const mockUseMutation = require("@tanstack/react-query").useMutation;
  const mockUseQuery = require("@tanstack/react-query").useQuery;
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMutation.mockReturnValue({
      mutate: jest.fn((_, opts) => {
        if (opts && typeof opts.onSuccess === "function") {
          opts.onSuccess("session-1");
        }
      }),
    });

    mockUseQuery.mockReturnValue({
      data: {
        socCurrent: 80,
        charging: true,
        price: 12.34,
      },
    });
  });

  it("renders initial UI with location and charger ID", () => {
    render(<Charging />);

    expect(screen.getByText("Test Location")).toBeOnTheScreen();
    expect(screen.getByText("CH-123")).toBeOnTheScreen();
  });

  it("shows session data from query", () => {
    render(<Charging />);

    expect(screen.getByText("80%")).toBeOnTheScreen();
    expect(screen.getByText("Charging")).toBeOnTheScreen();
    expect(screen.getByText("€12.34")).toBeOnTheScreen();
    expect(screen.getByText(/Type2/)).toBeOnTheScreen();
  });
});
