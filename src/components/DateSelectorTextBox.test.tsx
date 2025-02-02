import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import DateSelectorTextBox from "./DateSelectorTextBox";

describe("DateSelectorTextBox", () => {
  const mockSetDate = vi.fn();

  const renderComponent = (date: Date | null = null) => {
    render(
      <DateSelectorTextBox
        label="Test Date"
        date={date}
        setDate={mockSetDate}
      />
    );
  };

  test("renders the input with the correct label", () => {
    renderComponent();
    expect(screen.getByLabelText(/Test Date/i)).toBeInTheDocument();
  });

  test("displays the correct date in the input when date prop is provided", () => {
    const testDate = new Date(2023, 9, 15); // October 15, 2023
    renderComponent(testDate);
    expect(screen.getByDisplayValue("2023-10-15")).toBeInTheDocument();
  });

  test("calls setDate with the correct date when a valid date is entered", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    fireEvent.change(input, { target: { value: "2023-10-15" } });
    expect(mockSetDate).toHaveBeenCalledWith(new Date(2023, 9, 15));
  });

  test("displays an error message when an invalid date is entered", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    fireEvent.change(input, { target: { value: "invalid-date" } });
    expect(
      screen.getByText(/Error: Date must be in YYYY-MM-DD format./i)
    ).toBeInTheDocument();
  });

  test("displays an error message when an invalid date format is entered", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    fireEvent.change(input, { target: { value: "2023-02-30" } });
    expect(screen.getByText(/Error: Invalid date/i)).toBeInTheDocument();
  });

  test("clears the error message when a valid date is entered after an invalid date", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    fireEvent.change(input, { target: { value: "invalid-date" } });
    expect(
      screen.getByText(/Error: Date must be in YYYY-MM-DD format./i)
    ).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "2023-10-15" } });
    expect(
      screen.queryByText(/Error: Date must be in YYYY-MM-DD format./i)
    ).not.toBeInTheDocument();
  });
});
