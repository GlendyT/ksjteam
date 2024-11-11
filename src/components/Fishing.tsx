import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";
import { HangmanDrawing } from "./HangmanDrawing";
import useFish from "../hooks/useFishing";

export const Fishing = () => {
  const { isLoser, isWinner } = useFish();

  return (
    <div className=" flex flex-col items-center m-auto gap-6 relative z-10 ">
      <div>Fishing with TEAM KIM SEOKJIN</div>
      <HangmanDrawing />
      <HangmanWord />

      <Keyboard />

      <div className="text-lg items-center ">
        {isWinner && "Winner! - Refresh To try again"}
        {isLoser && "Nice Try! - Refresh To try again"}
      </div>
    </div>
  );
};
