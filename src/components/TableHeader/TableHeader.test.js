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
    const { getByText } = render(
      <TableHeader name="Sample Title" handleRefresh={handleRefreshMock} />
    );
    const buttonElement = getByText("Reload");
    fireEvent.click(buttonElement);
    expect(handleRefreshMock).toHaveBeenCalled();
  });
});
