import jin from "../assets/fishing.webp";
import fish1 from "../assets/fished.webp";
import looser from "../assets/looser.webp";
import useFish from "../hooks/useFishing";


const VerticalLine = () => {
  return <div className="w-0.5 h-5 bg-black -mx-0" />;
};

export const HangmanDrawing = () => {

  const { isWinner, isLoser, correctGuessCount} = useFish()
  return (
    <div className="relative inline-block">
      <img
        src={isWinner ? fish1 : isLoser ? looser : jin}
        alt={isWinner ? "Winner" : isLoser ? "Loser" : "Jin"}
        className="w-80 h-72"
      />
      <div className="absolute right-0 top-28 flex flex-col items-center">
        {!isWinner && !isLoser &&
          Array.from({ length: correctGuessCount }).map((_, index) => (
            <VerticalLine key={index} />
          ))}
      </div>
    </div>
  );
};
