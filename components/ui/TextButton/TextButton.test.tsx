import { render, screen, userEvent } from "@testing-library/react-native";
import TextButton, { TextButtonProps } from "./TextButton";
import { Text, View } from "react-native";

describe("TextButton", () => {
  const buttonProps: TextButtonProps = {
    text: "Start",
    onPress: jest.fn(),
    label: "Start Button",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the button with correct text and accesibility label", () => {
    render(<TextButton {...buttonProps} />);

    expect(
      screen.getByRole("button", { name: "Start Button" }),
    ).toBeOnTheScreen();
    expect(screen.getByText("Start")).toBeOnTheScreen();
  });

  it("calls onPress when pressed", async () => {
    const user = userEvent.setup();
    render(<TextButton {...buttonProps} />);

    await user.press(screen.getByRole("button", { name: "Start Button" }));
    expect(buttonProps.onPress).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onPress when disabledBool is true", async () => {
    const user = userEvent.setup();
    render(<TextButton {...buttonProps} disabledBool={true} />);

    await user.press(screen.getByRole("button", { name: "Start Button" }));
    expect(buttonProps.onPress).not.toHaveBeenCalled();
  });

  it("renders ActivityIndicator when isActivityIndicatorVisible is true and no customActivityIndicator", () => {
    render(<TextButton {...buttonProps} isActivityIndicatorVisible={true} />);
    expect(screen.getByRole("progressbar")).toBeOnTheScreen();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders custom activity indicator when provided", () => {
    const customIndicator = (
      <View testID="custom-indicator">
        <Text>Loading...</Text>
      </View>
    );

    render(
      <TextButton
        {...buttonProps}
        isActivityIndicatorVisible
        customActivityIndicator={customIndicator}
      />,
    );

    expect(screen.getByTestId("custom-indicator")).toBeOnTheScreen();
    expect(screen.getByText("Loading...")).toBeOnTheScreen();
  });

  it("applies numberOfLines to text", () => {
    render(<TextButton {...buttonProps} numberOfLines={1} />);

    const textElement = screen.getByText("Start");
    expect(textElement.props.numberOfLines).toBe(1);
  });

  it("applies custom styles", () => {
    const style = { backgroundColor: "red" };
    const textStyle = { color: "white" };

    render(
      <TextButton
        {...buttonProps}
        style={style}
        textStyle={textStyle}
        leftSideIcon="home"
        leftSideIconSize={20}
        rightSideIcon="account"
        rightSideIconSize={20}
      />,
    );

    const button = screen.getByRole("button", { name: "Start Button" });
    expect(button.props.style[0]).toMatchObject(style);
  });
});
