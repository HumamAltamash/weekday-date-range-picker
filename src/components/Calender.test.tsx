import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import Calendar from "./Calender";

describe("Calendar", () => {
  const mockHandleDateClick = vi.fn();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const renderCalendar = (
    startDate: Date | null = null,
    endDate: Date | null = null
  ) => {
    render(
      <Calendar
        startDate={startDate}
        endDate={endDate}
        handleDateClick={mockHandleDateClick}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
    );
  };

  test("renders calendar days", () => {
    renderCalendar();
    const days = screen.getAllByRole("button", { name: /\d+/ });
    expect(days.length).toBeGreaterThan(0);
  });

  test("disables weekend days", () => {
    renderCalendar();
    const weekendDays = screen
      .getAllByRole("button", { name: /\d+/ })
      .filter((button) => button.classList.contains("disabled"));
    expect(weekendDays.length).toBeGreaterThan(0);
  });

  test("calls handleDateClick when a weekday is clicked", () => {
    renderCalendar();
    const weekdayButton = screen
      .getAllByRole("button", { name: /\d+/ })
      .find((button) => !button.classList.contains("disabled"));
    if (weekdayButton) {
      fireEvent.click(weekdayButton);
      expect(mockHandleDateClick).toHaveBeenCalled();
    }
  });

  test("applies selected class to dates within the range", () => {
    const startDate = new Date(currentYear, currentMonth, 10);
    const endDate = new Date(currentYear, currentMonth, 15);
    renderCalendar(startDate, endDate);
    const selectedDays = screen
      .getAllByRole("button", { name: /\d+/ })
      .filter((button) => button.classList.contains("selected"));
    expect(selectedDays.length).toBeGreaterThan(0);
  });
});
