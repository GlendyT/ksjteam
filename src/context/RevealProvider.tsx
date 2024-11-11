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
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
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
    nextMidnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
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
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [previousMinute, setPreviousMinute] = useState<number | null>(null);
  const [allImagesDisplayed, setAllImagesDisplayed] = useState(false); // Track if all images have been displayed

  const updateTimeLeft = useCallback(() => {
    const now = new Date();
    const timeDiffInMs = nextMidnight.getTime() - now.getTime();

    if (timeDiffInMs <= 0) {
      window.clearInterval(intervalRef.current!);
      setItIsMidnight(true);
      setNextMidnight(getNextMidnight());
    }

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;

    const newTimeLeft = {
      hours: Math.floor(timeDiffInMs / hours),
      minutes: Math.floor((timeDiffInMs % hours) / minutes),
      seconds: Math.floor((timeDiffInMs % minutes) / seconds),
    };

    setTimeLeft(newTimeLeft);

    // Stop the countdown and display all images when the last image is shown
    if (newTimeLeft.minutes !== previousMinute) {
      setCurrentDayIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % weekdays.length;
        // If all images have been shown, stop updating
        if (newIndex === 6) {
          // Once the last image is displayed (index 6)
          setAllImagesDisplayed(true);
          window.clearInterval(intervalRef.current!); // Stop the countdown
        }
        return newIndex;
      });
      setPreviousMinute(newTimeLeft.minutes);
    }
  }, [nextMidnight, previousMinute]);

  useEffect(() => {
    if (isItMidnight()) {
      setItIsMidnight(true);
      return;
    }

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
    setAllImagesDisplayed(false); // Reset the display state when starting the countdown
    setCurrentDayIndex(0); // Reset the index to 0 when restarting
  };

  return (
    <RevealContext.Provider
      value={{
        itIsMidnight,
        onStartNextCountdownClick,
        padNumber,
        timeLeft,
        currentDayIndex,
        allImagesDisplayed, // Expose the new state
      }}
    >
      {children}
    </RevealContext.Provider>
  );
};

export { RevealProvider };

export default RevealContext;
