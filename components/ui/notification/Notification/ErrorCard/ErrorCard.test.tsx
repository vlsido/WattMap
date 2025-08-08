import React from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import { jest } from "@jest/globals";
import ErrorCard, { ErrorCardProps } from "./ErrorCard";

const baseProps: ErrorCardProps = {
  id: "1",
  text: "Something went wrong",
  type: "ERROR",
  ms: 2000,
  onClose: jest.fn(),
};

describe("ErrorCard", () => {
  it("calls onClose when pressed", async () => {
    const user = userEvent.setup();

    render(<ErrorCard {...baseProps} />);

    await user.press(screen.getByRole("button"));

    expect(baseProps.onClose).toHaveBeenCalledWith("1");
  });
});

describe("ErrorCard animations", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("animates width from 100% to 0% over given ms", () => {
    render(<ErrorCard {...baseProps} />);

    const errorMessage = screen.getByText("Something went wrong");

    expect(errorMessage).toBeTruthy();

    const slider = screen.getByTestId("error-slider");

    expect(slider).toHaveAnimatedStyle({
      width: "100%",
    });

    jest.advanceTimersByTime(2000);
    expect(slider).toHaveAnimatedStyle({
      width: "0%",
    });
  });
});
