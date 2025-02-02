import React, { useState, useEffect } from "react";
import "./WeekdayDatePickerStyles.css";

interface DateSelectorTextBoxProps {
  label: string;
  date: Date | null;
  setDate: (date: Date | null) => void;
}

const DateSelectorTextBox = (props: DateSelectorTextBoxProps) => {
  const { label, date, setDate } = props;

  const [error, setError] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      setInputDate(
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`
      );
    } else {
      setInputDate("");
    }
  }, [date]);

  const validateDate = (inputDate: string) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(inputDate)) {
      return "Error: Date must be in YYYY-MM-DD format.";
    }

    const [year, month, day] = inputDate.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return "Error: Invalid date";
    }

    return "";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputDate(value);
    setError("");

    const validationError = validateDate(value);
    setError(validationError);

    if (!validationError) {
      const [year, month, day] = value.split("-").map(Number);
      const newDate = new Date(year, month - 1, day);
      setDate(newDate);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label htmlFor="date" className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        id="date"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
        value={inputDate}
        className="date-selector-input"
      />
      {error && <p className="date-selector-error">{error}</p>}
    </div>
  );
};

export default DateSelectorTextBox;
