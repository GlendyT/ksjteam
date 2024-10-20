import { useCallback, useEffect, useState } from "react";
import { wordList } from "../wordList";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

function getWord() {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

export const Fishing = () => {
  const [wordData, setWordData] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wordToGuess = wordData.word; // Accede a la palabra
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
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
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== "Enter") return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordData(getWord()); // Cambiado para usar setWordData
    };
    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        gap: "2rem",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {isWinner && "Winner! - Refresh To try again"}
        {isLoser && "Nice Try! - Refresh To try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <p>Clue: {wordData.clue}</p> {/* Aquí se muestra la pista */}
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
};
