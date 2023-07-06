import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableHeader from "./TableHeader";

describe("TableHeader", () => {
  test("renders with the provided name", () => {
    const name = "Sample Title";
    const { getByText } = render(<TableHeader name={name} />);
    const titleElement = getByText(name);
    expect(titleElement).toBeInTheDocument();
  });

  test("calls handleRefresh when the button is clicked", () => {
    const handleRefreshMock = jest.fn();
    const { getByRole } = render(
      <TableHeader
        name="Sample Title"
        handleRefresh={handleRefreshMock}
        disableReloadButton={false}
      />
    );
    const buttonElement = getByRole("button", { name: "Reload" });
    fireEvent.click(buttonElement);
    expect(handleRefreshMock).toHaveBeenCalled();
  });

  test("disables the button when disableReloadButton prop is true", () => {
    const handleRefreshMock = jest.fn();
    const { getByRole } = render(
      <TableHeader
        name="Sample Title"
        handleRefresh={handleRefreshMock}
        disableReloadButton={true}
      />
    );
    const buttonElement = getByRole("button", { name: "Reload" });
    expect(buttonElement).toBeDisabled();
  });
});
