import "./MonthYearModal.css";

interface MonthYearModalProps {
  open: boolean;
  onClose: () => void;
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}

const months = Array.from({ length: 12 }, (_, i) => i);
const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

const MonthYearModal = (props: MonthYearModalProps) => {
  const {
    open,
    onClose,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
  } = props;

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Select Month and Year</h2>
        <div className="modal-content">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="modal-select"
            aria-label="Select Month"
          >
            <option value="" disabled>
              Select Month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="modal-select"
            aria-label="Select Year"
          >
            <option value="" disabled>
              Select Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button onClick={onClose} className="modal-button">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthYearModal;
