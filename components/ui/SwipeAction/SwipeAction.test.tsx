import { render, screen, userEvent } from "@testing-library/react-native";

import SwipeAction from "./SwipeAction";

const baseProps = {
  text: "Swipe me",
  backgroundColor: "blue",
  thumbColor: "red",
  thumbSize: 36,
  onSwipeEnd: jest.fn(),
};

describe("SwipeAction", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  it("renders with initial styles", () => {
    render(<SwipeAction {...baseProps} />);

    expect(screen.getByRole("button")).toHaveAnimatedStyle({
      left: 0,
      opacity: 1,
    });

    expect(screen.getByText("Swipe me")).toBeOnTheScreen();
  });

  it("triggers showActivity on press", async () => {
    const user = userEvent.setup();

    render(<SwipeAction {...baseProps} />);

    const pressable = screen.getByRole("button");

    await user.press(pressable);

    // After press, offsetX animates to thumbSize * 1.5 in 250ms then back to 0
    jest.advanceTimersByTime(250); // halfway
    expect(pressable).toHaveAnimatedStyle({
      left: baseProps.thumbSize * 1.5,
    });

    // The second part of animation is physics based, so I will use 1000 to be sure
    jest.advanceTimersByTime(1000); // back to start
    expect(pressable).toHaveAnimatedStyle({
      left: 0,
    });
  });
});
