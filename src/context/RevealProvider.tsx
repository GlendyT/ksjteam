import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { weekdays } from "../components/Data";

type RevealContextProps = {
  itIsMidnight: boolean;
  onStartNextCountdownClick: () => void;
  padNumber: (arg0: number) => string;
  timeLeft: { hours: number; minutes: number; seconds: number };
  currentDayIndex: number;
  allImagesDisplayed: boolean;
};
type RevealProviderProps = {
  children: ReactNode;
};

const RevealContext = createContext<RevealContextProps>(null!);

const RevealProvider = ({ children }: RevealProviderProps) => {
  const getNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    return nextMidnight;
  };

  const isItMidnight = () => {
    const now = new Date();
    return (
      now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0
    );
  };

  const padNumber = (number: number) =>
    number < 10 ? `0${number}` : `${number}`;

  const intervalRef = useRef<number | null>(null);
  const [itIsMidnight, setItIsMidnight] = useState(false);
  const [nextMidnight, setNextMidnight] = useState(getNextMidnight());
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [currentDayIndex, setCurrentDayIndex] = useState(-1); // Inicializar en -1 para que no se muestren imágenes al principio
  const [previousMinute, setPreviousMinute] = useState<number | null>(null);
  const [allImagesDisplayed, setAllImagesDisplayed] = useState(false);

  const updateTimeLeft = useCallback(() => {
    const now = new Date();
    const timeDiffInMs = nextMidnight.getTime() - now.getTime();
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;

    const timeRemaining = {
      hours: Math.floor(timeDiffInMs / hours),
      minutes: Math.floor((timeDiffInMs % hours) / minutes),
      seconds: Math.floor((timeDiffInMs % minutes) / seconds),
    };

    setTimeLeft(timeRemaining);

    if (timeDiffInMs <= 0) {
      window.clearInterval(intervalRef.current!);
      setItIsMidnight(true);
      setNextMidnight(getNextMidnight());
    }

    // Asegurarnos de que solo se incrementa el índice de día cuando pasa 1 minuto completo
    if (timeRemaining.minutes !== previousMinute) {
      setCurrentDayIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        // No incrementar más allá del límite de días (7 días en total)
        if (newIndex >= weekdays.length) {
          setAllImagesDisplayed(true);
          window.clearInterval(intervalRef.current!);
          return prevIndex;
        }

        return newIndex;
      });

      setPreviousMinute(timeRemaining.minutes);
    }
  }, [nextMidnight, previousMinute]);

  useEffect(() => {
    // Si ya es medianoche, no iniciamos el contador.
    if (isItMidnight()) {
      setItIsMidnight(true);
      return;
    }

    // Comenzamos el contador de tiempo y actualizamos cada segundo
    updateTimeLeft();
    intervalRef.current = window.setInterval(updateTimeLeft, 1000);

    return () => {
      window.clearInterval(intervalRef.current!);
    };
  }, [nextMidnight, updateTimeLeft]);

  const onStartNextCountdownClick = () => {
    updateTimeLeft();
    intervalRef.current = window.setInterval(updateTimeLeft, 1000);
    setItIsMidnight(false);
    setAllImagesDisplayed(false);
    setCurrentDayIndex(-1); // Reiniciar a -1 para no mostrar imágenes inmediatamente
  };

  return (
    <RevealContext.Provider
      value={{
        itIsMidnight,
        onStartNextCountdownClick,
        padNumber,
        timeLeft,
        currentDayIndex,
        allImagesDisplayed,
      }}
    >
      {children}
    </RevealContext.Provider>
  );
};

export { RevealProvider };

export default RevealContext;
