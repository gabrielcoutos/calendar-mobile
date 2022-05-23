import logo from './logo.svg';
import './App.scss';
const { InputDatePicker } = require('@andes/datepicker');

/**
   *
   */
 function handlerOnRangeChange(selectedDays, resetSelectDays) {
  const { from, to } = selectedDays;
}


function App() {

  return (
    <div className="App">
     <InputDatePicker
  disableSubmitButton
  disableWeekends
  displayMode="inline"
  fromMonth={new Date("2022-02-10T03:00:00.000Z")}
  initialMonth={new Date("2022-04-01T03:00:00.000Z")}
  label="Select a day"
  locale="pt"
  message="message"
  selectionType="range"
  toMonth={new Date("2022-07-20T03:00:00.000Z")}
/>
    </div>
  );
}

export default App;
