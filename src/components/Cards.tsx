import Card from "./Card";
import useFlip from "../hooks/useFlip";

const Cards = () => {
  const { items } = useFlip();

  return (
    <div className="w-96">
      <div className="bg-white grid grid-cols-5 items-center justify-center gap-1 p-2 border-black border-4  ">
        {items.map((item) => (
          <Card key={item.id2} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
