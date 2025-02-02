import { useState } from "react";
import Calendar from "./Calender";
import DateSelectorTextBox from "./DateSelectorTextBox";
import "./WeekdayDatePickerStyles.css";
import MonthYearModal from "./MonthYearModal";

interface WeekdayDateRangePickerProps {
  onChange: (dates: string[], weekendDates: string[]) => void;
}

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 6 || day === 0;
};

const getWeekendDates = (startDate: Date, endDate: Date) => {
  let weekends: string[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isWeekend(currentDate)) {
      weekends.push(currentDate.toLocaleDateString("en-CA"));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
};

const predefinedRanges = [
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
];

const WeekdayDateRangePicker = (props: WeekdayDateRangePickerProps) => {
  const { onChange } = props;

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // @ts-ignore
  const myIcon: IconProp = ["fa-solid", "fa-calendar-days"];

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
    if (currentMonth === 11) setCurrentYear((prevYear) => prevYear + 1);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) return;

    if (!startDate || (startDate && endDate && startDate !== endDate)) {
      setStartDate(date);
      setEndDate(date);
      onChange(
        [date.toLocaleDateString("en-CA"), date.toLocaleDateString("en-CA")],
        []
      );
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }

      const weekendDates = getWeekendDates(startDate, date);
      onChange(
        [
          Math.min(startDate.getTime(), date.getTime()) === startDate.getTime()
            ? startDate.toLocaleDateString("en-CA")
            : date.toLocaleDateString("en-CA"),
          Math.max(startDate.getTime(), date.getTime()) === startDate.getTime()
            ? startDate.toLocaleDateString("en-CA")
            : date.toLocaleDateString("en-CA"),
        ],
        weekendDates
      );
    }
  };

  const applyPredefinedRange = (days: number) => {
    let end = new Date();
    end.setDate(end.getDate() - 1);

    let start = new Date(end);
    start.setDate(end.getDate() - days + 1);

    while (isWeekend(start)) {
      start.setDate(start.getDate() + 1);
    }
    while (isWeekend(end)) {
      end.setDate(end.getDate() - 1);
    }

    if (start.getTime() === end.getTime()) {
      start.setDate(start.getDate() - 1);
      while (isWeekend(start)) {
        start.setDate(start.getDate() - 1);
      }
    }

    setStartDate(start);
    setEndDate(end);

    const weekendDates = getWeekendDates(start, end);
    onChange(
      [start.toLocaleDateString("en-CA"), end.toLocaleDateString("en-CA")],
      weekendDates
    );
  };

  function handleCalenderButtonClick(): void {
    setShowCalendar((prev) => !prev);
  }

  return (
    <div className="weekday-date-picker-container">
      <div className="date-selector-container">
        <DateSelectorTextBox
          label="Start Date"
          date={startDate}
          setDate={setStartDate}
        />
        <DateSelectorTextBox
          label="End Date"
          date={endDate}
          setDate={setEndDate}
        />
        <button className="calender-button" onClick={handleCalenderButtonClick}>
          🗓️
        </button>
      </div>
      {showCalendar && (
        <>
          <div className="calendar-container">
            <div className="calendar-header">
              <button className="button" onClick={goToPreviousMonth}>
                Previous Month
              </button>
              <div className="month-year-label" onClick={handleOpenModal}>
                {new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {currentYear}
              </div>
              <button className="button" onClick={goToNextMonth}>
                Next Month
              </button>
            </div>
            <Calendar
              startDate={startDate}
              endDate={endDate}
              handleDateClick={handleDateClick}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
          <div className="button-container">
            {predefinedRanges.map((range) => (
              <button
                key={range.label}
                className="button"
                onClick={() => applyPredefinedRange(range.days)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </>
      )}
      <MonthYearModal
        open={isModalOpen}
        onClose={handleCloseModal}
        selectedMonth={currentMonth}
        selectedYear={currentYear}
        setSelectedMonth={setCurrentMonth}
        setSelectedYear={setCurrentYear}
      />
    </div>
  );
};

export default WeekdayDateRangePicker;
