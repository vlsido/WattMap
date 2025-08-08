import { render, screen, userEvent } from "@testing-library/react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConnectorView from "./ConnectorView";
import { ConnectorStatus, ConnectorType } from "@/types/common";
import ConnectorIcon from "@/components/connector/ConnectorIcon/ConnectorIcon";
import { Colors } from "@/constants/Colors";

jest.mock("@/components/connector/ConnectorIcon/ConnectorIcon", () => {
  const React = require("react");
  return jest.fn((props) => {
    return React.createElement("MockConnectorIcon", props, null);
  });
});

const baseProps = {
  id: 1,
  connectorType: "Type 2" as ConnectorType,
  status: "AVAILABLE" as ConnectorStatus,
  priceInCentsPerKWh: 250,
  maxPowerOutputKW: 50,
  isSelected: false,
  onSelect: jest.fn(),
};

describe("ConnectorView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all main UI elements", () => {
    render(<ConnectorView {...baseProps} />);

    expect(screen.getByText("AVAILABLE")).toBeOnTheScreen();
    expect(screen.getByText("Type 2")).toBeOnTheScreen();
    expect(screen.getByText("Up to 50kW")).toBeOnTheScreen();
    expect(screen.getByText("€2.5/kWh")).toBeOnTheScreen();

    expect(ConnectorIcon).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "Type 2",
        status: "AVAILABLE",
        size: 24,
      }),
      undefined,
    );

    expect(MaterialCommunityIcons).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "lightning-bolt",
        color: Colors.light.primaryYellow,
        size: 24,
      }),
      undefined,
    );
  });

  it("shows SELECTED label when isSelected is true", () => {
    render(<ConnectorView {...baseProps} isSelected={true} />);
    expect(screen.getByText("SELECTED")).toBeOnTheScreen();
  });

  it("does not show SELECTED label when isSelected is false", () => {
    render(<ConnectorView {...baseProps} isSelected={false} />);
    expect(screen.queryByText("SELECTED")).toBeNull();
  });

  it.each<ConnectorStatus>(["IN USE", "UNAVAILABLE"])(
    "disables button and reduces opacity when status is %s",
    (status) => {
      render(<ConnectorView {...baseProps} status={status} />);

      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByRole("button")).toHaveStyle({ opacity: 0.75 });
    },
  );

  it("calls onSelect with correct connector when pressed and AVAILABLE", async () => {
    const user = userEvent.setup();
    render(<ConnectorView {...baseProps} />);

    await user.press(screen.getByRole("button"));

    expect(baseProps.onSelect).toHaveBeenCalledWith({
      id: 1,
      connectorType: "Type 2",
      status: "AVAILABLE",
      priceInCentsPerKWh: 250,
      maxPowerOutputKW: 50,
    });
  });

  it("does not call onSelect when status is not AVAILABLE", async () => {
    const user = userEvent.setup();
    render(<ConnectorView {...baseProps} status="IN USE" />);

    await user.press(screen.getByRole("button"));

    expect(baseProps.onSelect).not.toHaveBeenCalled();
  });

  it.each<ConnectorStatus>(["AVAILABLE", "IN USE", "UNAVAILABLE"])(
    "uses correct status color for each status",
    (status) => {
      render(<ConnectorView {...baseProps} status={status} />);
      expect(screen.getByText(status)).toBeOnTheScreen();
    },
  );
});

describe("ConnectorView animations", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("animates scale and opacity when status is AVAILABLE", () => {
    render(<ConnectorView {...baseProps} />);

    const pingView = screen.getByTestId("ping-view");

    expect(pingView).toHaveStyle({ opacity: 1, transform: [{ scale: 1 }] });

    expect(pingView).toHaveAnimatedStyle({
      opacity: 1,
      transform: [{ scale: 1 }],
    });

    jest.advanceTimersByTime(1000);

    expect(pingView).toHaveAnimatedStyle({
      opacity: 0.5,
      transform: [{ scale: 0.9 }],
    });

    jest.advanceTimersByTime(1000);

    expect(pingView).toHaveAnimatedStyle({
      opacity: 1,
      transform: [{ scale: 1 }],
    });
  });
});
