import { useState } from "react";
import { format } from "date-fns";
import './App.css'

function App() {
  const [horario, setHorario] = useState("00:00");
  const date = new Date();


  function FormatMTH(totalMinutes) {

    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return`${padTo2Digits(hours)}`
  }

  // Converter minutos para horas
  function HoursToMinutes(totalMinutes) {

    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    setHorario(`${padTo2Digits(hours)}:${padTo2Digits(minutes)}`);
  }
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  // Converter Horas para minutos e retorna de acordo com timezone
  function convertHTMTimezone(timeInHour) {
    var timeParts = timeInHour.split(":");
    let result;
    result = Number(timeParts[0]) * 60 + Number(timeParts[1]);
    result = result + date.getTimezoneOffset();
    return HoursToMinutes(result);
  }

  // Converter Horas para minutos 
  function convertHTM(timeInHour) {
    var timeParts = timeInHour.split(":");
    let result;
    result = Number(timeParts[0]) * 60 + Number(timeParts[1]);
    return HoursToMinutes(result);
  }

  return (
    <div className="App">
      <h2 style={{fontSize: '48px'}} >{horario}</h2>

      <button onClick={() => convertHTM(format(date, "HH:mm"))}>
        Saber horas sem timezone
      </button>

      <button style={{marginLeft: '10px'}} onClick={() => convertHTMTimezone(format(date, "HH:mm"))}>
        Saber horas com timezone
      </button>

      <p>Timezone local: {FormatMTH(date.getTimezoneOffset())}</p>
    </div>
  )
}

export default App
