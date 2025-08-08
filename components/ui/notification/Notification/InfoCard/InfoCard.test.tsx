import { render, screen, userEvent } from "@testing-library/react-native";
import InfoCard, { InfoCardProps } from "./InfoCard";

const baseProps: InfoCardProps = {
  id: "1",
  text: "Something went wrong",
  type: "INFO",
  ms: 2000,
  onClose: jest.fn(),
};

describe("InfoCard", () => {
  it("calls onClose when pressed", async () => {
    const user = userEvent.setup();

    render(<InfoCard {...baseProps} />);

    await user.press(screen.getByRole("button"));

    expect(baseProps.onClose).toHaveBeenCalledWith("1");
  });
});
