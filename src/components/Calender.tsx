import "./WeekdayDatePickerStyles.css";

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateClick: (date: Date) => void;
  currentMonth: number;
  currentYear: number;
}

const isWeekend = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const Calendar = (props: CalendarProps) => {
  const { startDate, endDate, handleDateClick, currentMonth, currentYear } =
    props;

  const getClassName = (currentDate: Date) => {
    if (isWeekend(currentDate)) return "disabled";

    if (
      startDate &&
      endDate &&
      currentDate?.setHours(0, 0, 0, 0) >= startDate?.setHours(0, 0, 0, 0) &&
      currentDate?.setHours(0, 0, 0, 0) <= endDate?.setHours(0, 0, 0, 0)
    )
      return "selected";
    return "";
  };

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);

    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(firstDay);
      currentDate.setDate(firstDay.getDate() + i - firstDay.getDay());

      const isOutsideMonth = currentDate.getMonth() !== currentMonth;

      days.push(
        <button
          key={currentDate.toLocaleDateString("en-CA")}
          onClick={() => handleDateClick(currentDate)}
          disabled={isWeekend(currentDate)}
          className={
            "calendar-day " +
            getClassName(currentDate) +
            (isOutsideMonth ? " outside-month" : "")
          }
        >
          {currentDate.getDate()}
        </button>
      );
    }

    return <div className="calendar-grid">{days}</div>;
  };

  return <div className="calendar-container">{renderCalendar()}</div>;
};

export default Calendar;
