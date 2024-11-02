import jin from "../assets/jin.png";
import fish1 from "../assets/fish1.webp";

type HangmanDrawingProps = {
  correctGuessCount: number
  isWinner: boolean
}

const VerticalLine = () => {
  return <div className=" w-1.5 h-3.5 bg-black mx-1 mt-1" />;
};

export const HangmanDrawing = ({ correctGuessCount, isWinner }: HangmanDrawingProps) => {
  return (
    <div className="relative inline-block">
      <img src={jin} alt="Jin" className="w-80 h-72" />
      <div className="absolute right-0 top-28 flex flex-col items-center">
        {Array.from({ length: correctGuessCount }).map((_, index) => (
          <>
            <VerticalLine key={index} />
          </>
        ))}
        {/* Show fish1 image only if the player has won */}
        {isWinner && (
          <img
            src={fish1}
            alt="Fish"
            className="relative w-36 h-24 mt-2 z-1 top-4 rotate-90"
          />
        )}
      </div>
    </div>
  );
};
