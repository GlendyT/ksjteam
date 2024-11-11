import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { wordList } from "../wordList";

type FishContextProps = {
  correctGuessCount: number;
  correctLetters: string[];
  isLoser: boolean;
  isWinner: boolean;
  wordToGuess: string;
  guessedLetters: string[];
  addGuessedLetter: (letter: string) => void;
  handleClick: (key: string) => void;
  pressedLetter: string | null;
  reveal: boolean;
  activeLetters: string[];
  disabled: boolean;
  inactiveLetters: string[];
};

type FishProviderProps = {
  children: ReactNode;
};

const FishContext = createContext<FishContextProps>(null!);

const FishProvider = ({ children }: FishProviderProps) => {
  function getWord() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  }

  const MAX_TRIES = 6;
  const [wordData, setWordData] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [pressedLetter, setPressedLetter] = useState<string | null>(null);

  const wordToGuess = wordData.word;
  const correctLetters = guessedLetters.filter((letter) =>
    wordToGuess.includes(letter)
  );

  const incorrectGuesses = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectGuesses.length >= MAX_TRIES;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter, guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordData(getWord());
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  const handleClick = (key: string) => {
    setPressedLetter(key);
    addGuessedLetter(key);

    setTimeout(() => {
      setPressedLetter(null);
    }, 200);
  };

  return (
    <FishContext.Provider
      value={{
        correctGuessCount: correctLetters.length,
        correctLetters,
        isLoser,
        isWinner,
        wordToGuess,
        guessedLetters,
        addGuessedLetter,
        handleClick,
        pressedLetter,
        reveal: isLoser,
        activeLetters: correctLetters,
        disabled: isWinner || isLoser,
        inactiveLetters: guessedLetters.filter(
          (letter) => !wordToGuess.includes(letter)
        ),
      }}
    >
      {children}
    </FishContext.Provider>
  );
};

export { FishProvider };

export default FishContext;
