import useReveal from "../hooks/useReveal";
import { weekdays } from "./Data";

function ScheduledImage() {
  const {
    itIsMidnight,
    padNumber,
    timeLeft, // Tiempo global para el contador
    currentDayIndex,
    allImagesDisplayed, // Indica si todas las imágenes se mostraron
  } = useReveal();

  return (
    <div className="min-h-screen flex items-center justify-center">
      {itIsMidnight ? (
        <></>
      ) : (
        <div className="flex p-4">
          <div className="grid grid-cols-7  gap-4 mt-4 max-sm:grid-cols-2 max-lg:grid-cols-3">
            {weekdays.map((weekday, index) => {
              const isImageVisible =
                index <= currentDayIndex || allImagesDisplayed;

              return (
                <div
                  key={index}
                  className=" border-2 border-black flex flex-col justify-center"
                >
                  <h2 className="text-center">{weekday.day}</h2>
                  {!isImageVisible && (
                    <div className="flex items-center px-2">
                      <span>
                        <b>{padNumber(timeLeft.hours)}</b> horas,{" "}
                        <b>{padNumber(timeLeft.minutes)}</b> minutos y{" "}
                        <b>{padNumber(timeLeft.seconds)}</b> segundos
                      </span>
                    </div>
                  )}

                  <div
                    className={`image-container ${
                      isImageVisible ? "visible" : "invisible"
                    }`}
                  >
                    <img src={weekday.image} alt={weekday.day} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduledImage;
