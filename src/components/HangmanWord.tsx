import useFish from "../hooks/useFishing";


export default function HangmanWord() {
  const { wordToGuess, guessedLetters, reveal } = useFish();
  return (
    <div className="flex gap-1 text-4xl font-extrabold uppercase font-mono">
      {wordToGuess.split("").map((letter, index) => (
        <span style={{ borderBottom: ".1em solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(letter) || reveal
                  ? "visible"
                  : "hidden",
              color:
                !guessedLetters.includes(letter) && reveal ? "red" : "black",
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
}
