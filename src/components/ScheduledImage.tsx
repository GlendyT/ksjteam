import useReveal from "../hooks/useReveal";
import { weekdays } from "./Data";

function ScheduledImage() {
  const { itIsMidnight, onStartNextCountdownClick, padNumber, timeLeft, currentDayIndex, allImagesDisplayed } = useReveal();

  return (
    <div className="App">
      {itIsMidnight ? (
        <div className="is-midnight-wrapper">
          <h1>¡Es medianoche!</h1>
          <button onClick={onStartNextCountdownClick}>
            Comenzar cuenta para el próximo día
          </button>
        </div>
      ) : (
        <div className="countdown-wrapper">
          <span>
            <b>{padNumber(timeLeft.hours)}</b> horas,{" "}
            <b>{padNumber(timeLeft.minutes)}</b> minutos y{" "}
            <b>{padNumber(timeLeft.seconds)}</b> segundos
          </span>

          <div className="grid grid-cols-7 gap-4 mt-4">
            {weekdays.map((weekday, index) => (
              <div
                key={index}
                className={`image-wrapper ${index <= currentDayIndex || allImagesDisplayed ? "visible" : "invisible"}`}
              >
                <h2>{weekday.day}</h2>
                <img src={weekday.image} alt={weekday.day} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


export default ScheduledImage;
