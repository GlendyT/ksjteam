import useFlip from "../hooks/useFlip";


type CardProps = {
    item: {
        id: number;
        id2: number;
        img: string;
        price: string;
        isMatched?: boolean;
    };
};

const Card = ({ item }: CardProps) => {
    const { onCardClick, isFlipped } = useFlip()


    return (
        <div
            className="w-auto h-20 group perspective max-sm:h-20 font-quatt  "
            onClick={() => onCardClick(item)}
        >
            <div
                className={`relative preserve-3d w-full h-full duration-1000 ${isFlipped(item) ? "my-rotate-y-180" : ""
                    }`}
            >
                <div className={`absolute bg-v bg-center bg-cover overflow-hidden inset-0 backface-hidden max-sm:pb-2 max-sm:px-4`}>

                </div>

                <div className="absolute backface-hidden w-full h-full overflow-hidden my-rotate-y-180">

                    <img
                        src={item.img}
                        alt=""
                        className="absolute inset-0 backface-hidden object-contain "
                    />
                </div>
            </div>
        </div>
    );
};

export default Card;




