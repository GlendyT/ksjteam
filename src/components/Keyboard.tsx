import { useState } from "react";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

type KeyBoardProps = {
  disabled: boolean;
  activeLetters: string[];
  inactiveLetters: string[];
  addGuessedLetter: (letter: string) => void;
};

export default function Keyboard({
  activeLetters,
  disabled = false,
  inactiveLetters,
  addGuessedLetter,
}: KeyBoardProps) {
  const [pressedLetter, setPressedLetter] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setPressedLetter(key);
    addGuessedLetter(key);

    // Reset pressed letter after a short delay to visually show the effect
    setTimeout(() => {
      setPressedLetter(null);
    }, 200); // Adjust the delay as needed
  };

  return (
    <div className="flex flex-row max-sm:grid max-sm:grid-cols-10 items-center justify-center gap-1 text-xs max-sm:px-4">
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        const isPressed = pressedLetter === key;

        let buttonClass =
          "w-full border-2 py-1 px-2 text-lg uppercase font-bold cursor-pointer text-black ";

        // Determine the button color based on the state
        if (isActive) {
          buttonClass += "bg-purple-600 text-white cursor-not-allowed";
        } else if (isInactive) {
          buttonClass += "bg-red-400 cursor-not-allowed";
        } else if (isPressed) {
          buttonClass += "bg-red-500 text-white"; // Color for pressed but incorrect letter
        } else {
          buttonClass += "bg-blue-500";
        }

        return (
          <button
            onClick={() => handleClick(key)}
            className={buttonClass}
            key={key}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}
