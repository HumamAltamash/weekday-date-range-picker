import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import MonthYearModal from "./MonthYearModal";

describe("MonthYearModal", () => {
  const mockOnClose = vi.fn();
  const mockSetSelectedMonth = vi.fn();
  const mockSetSelectedYear = vi.fn();

  const renderComponent = (
    open = true,
    selectedMonth = 0,
    selectedYear = new Date().getFullYear()
  ) => {
    render(
      <MonthYearModal
        open={open}
        onClose={mockOnClose}
        selectedMonth={selectedMonth}
        setSelectedMonth={mockSetSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={mockSetSelectedYear}
      />
    );
  };

  test("renders the modal when open is true", () => {
    renderComponent();
    expect(screen.getByText(/Select Month and Year/i)).toBeInTheDocument();
  });

  test("does not render the modal when open is false", () => {
    renderComponent(false);
    expect(
      screen.queryByText(/Select Month and Year/i)
    ).not.toBeInTheDocument();
  });

  test("calls setSelectedMonth when a month is selected", () => {
    renderComponent();
    const select = screen.getByLabelText(/Select Month/i);
    fireEvent.change(select, { target: { value: "1" } });
    expect(mockSetSelectedMonth).toHaveBeenCalledWith(1);
  });

  test("calls setSelectedYear when a year is selected", () => {
    renderComponent();
    const select = screen.getByRole("combobox", { name: /Select Year/i });

    fireEvent.change(select, { target: { value: "2022" } });
    expect(mockSetSelectedYear).toHaveBeenCalledWith(2022);
  });

  test("calls onClose when the confirm button is clicked", () => {
    renderComponent();
    const button = screen.getByText(/Confirm/i);
    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
