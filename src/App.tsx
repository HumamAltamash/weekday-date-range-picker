import WeekdayDateRangePicker from "./components/WeekdayDateRangePicker";

function App() {
  const handleDateChange = (range: string[], weekends: string[]) => {
    console.log("Selected Range:", range);
    console.log("Weekend Dates:", weekends);
  };

  return (
    <div>
      <WeekdayDateRangePicker onChange={handleDateChange} />
    </div>
  );
}

export default App;
