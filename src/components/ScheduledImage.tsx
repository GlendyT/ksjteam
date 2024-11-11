import { useCallback, useEffect, useRef, useState } from 'react';

const getNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
    return nextMidnight;
};

const isItMidnight = () => {
    const now = new Date();
    return now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0;
};

const padNumber = (number) => (number < 10 ? `0${number}` : `${number}`);

const wordList = ["Palabra1", "Palabra2", "Palabra3", "Palabra4", "Palabra5"];

function ScheduledImage() {
    const intervalRef = useRef(null);
    const wordIntervalRef = useRef(null);

    const [itIsMidnight, setItIsMidnight] = useState(false);
    const [nextMidnight, setNextMidnight] = useState(getNextMidnight());
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const updateTimeLeft = useCallback(() => {
        const now = new Date();
        const timeDiffInMs = nextMidnight.getTime() - now.getTime();

        if (timeDiffInMs <= 0) {
            window.clearInterval(intervalRef.current);
            setItIsMidnight(true);
            setNextMidnight(getNextMidnight());
        }

        const seconds = 1000;
        const minutes = seconds * 60;
        const hours = minutes * 60;

        setTimeLeft({
            hours: Math.floor(timeDiffInMs / hours),
            minutes: Math.floor((timeDiffInMs % hours) / minutes),
            seconds: Math.floor((timeDiffInMs % minutes) / seconds),
        });
    }, [nextMidnight]);

    useEffect(() => {
        if (isItMidnight()) {
            setItIsMidnight(true);
            return;
        }

        updateTimeLeft();
        intervalRef.current = window.setInterval(updateTimeLeft, 1000);

        return () => {
            window.clearInterval(intervalRef.current);
        };
    }, [nextMidnight, updateTimeLeft]);

    // Función para avanzar a la siguiente palabra cada minuto
    useEffect(() => {
        wordIntervalRef.current = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % wordList.length);
        }, 60000); // 60,000 ms = 1 minuto

        return () => clearInterval(wordIntervalRef.current);
    }, []);

    const onStartNextCountdownClick = () => {
        updateTimeLeft();
        intervalRef.current = window.setInterval(updateTimeLeft, 1000);
        setItIsMidnight(false);
    };

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
                        <b>{padNumber(timeLeft.hours)}</b> horas, <b>{padNumber(timeLeft.minutes)}</b>{' '}
                        minutos y <b>{padNumber(timeLeft.seconds)}</b> segundos
                    </span>
                    <div className="word-display">
                        <h2>Palabra actual: {wordList[currentWordIndex]}</h2>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ScheduledImage;
