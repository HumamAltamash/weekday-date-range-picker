import { expect, test, describe, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeekdayDateRangePicker from "./WeekdayDateRangePicker";

describe("WeekdayDateRangePicker", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    render(<WeekdayDateRangePicker onChange={mockOnChange} />);
  });

  test("renders start and end date text boxes", () => {
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Date/i)).toBeInTheDocument();
  });

  test("opens calendar when calendar button is clicked", () => {
    const calendarButton = screen.getByRole("button", { name: /🗓️/i });
    fireEvent.click(calendarButton);
    expect(screen.getByText(/Previous Month/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Month/i)).toBeInTheDocument();
  });

  test("calls onChange with correct dates when a date range is selected", async () => {
    const calendarButton = screen.getByRole("button", { name: /🗓️/i });
    fireEvent.click(calendarButton);

    await screen.findByText(/Previous Month/i);

    const dateButtons = screen.getAllByRole("button", { name: /\d+/ });

    fireEvent.click(dateButtons[1]);
    fireEvent.click(dateButtons[2]);

    await screen.findByText(/End Date/i);

    expect(mockOnChange).toHaveBeenCalledWith(
      [expect.any(String), expect.any(String)],
      expect.any(Array)
    );
  });

  test("applies predefined range when a predefined range button is clicked", async () => {
    const calendarButton = screen.getByRole("button", { name: /🗓️/i });
    fireEvent.click(calendarButton);

    const predefinedRangeButton = await screen.findByText(/Last 7 Days/i);
    fireEvent.click(predefinedRangeButton);

    expect(mockOnChange).toHaveBeenCalledWith(
      [expect.any(String), expect.any(String)],
      expect.any(Array)
    );
  });
});
