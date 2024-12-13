import { createContext, ReactNode, useEffect, useState } from "react";

type Item = {
    id: number;
    id2: number;
    img: string;
    price: string;
    isMatched?: boolean;
};

type FlipContextProps = {
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
    prev: number,
    setPrev: React.Dispatch<React.SetStateAction<number>>,
    check: (current: number) => void,
    handleClick: (id: number) => void
    isFlipped: (item: Item) => string | boolean,
    onCardClick: (item: Item) => void
};

type FlipProviderProps = {
    children: ReactNode;
};

const FlipContext = createContext<FlipContextProps>(null!);

const FlipProvider = ({ children }: FlipProviderProps) => {
    const [items, setItems] = useState<Item[]>(
        [
            { id: 1, img: "https://i.scdn.co/image/ab67616d00001e028764ebc69bd91a01cc3948a2", price: "", id2: 1 },
            { id: 1, img: "https://i.scdn.co/image/ab67616d00001e028764ebc69bd91a01cc3948a2", price: "", id2: 2 },
            { id: 2, img: "https://i.scdn.co/image/ab67616d00001e02377ee031d0a3da40db19ccf4", price: "", id2: 3 },
            { id: 2, img: "https://i.scdn.co/image/ab67616d00001e02377ee031d0a3da40db19ccf4", price: "", id2: 4 },
            { id: 3, img: "https://i.scdn.co/image/ab67616d00001e0272b573d5d66d964760f34c07", price: "", id2: 5 },
            { id: 3, img: "https://i.scdn.co/image/ab67616d00001e0272b573d5d66d964760f34c07", price: "", id2: 6 },
            { id: 4, img: "https://i.scdn.co/image/ab67616d00001e0256aba220ff2940e92ff15168", price: "", id2: 7 },
            { id: 4, img: "https://i.scdn.co/image/ab67616d00001e0256aba220ff2940e92ff15168", price: "", id2: 8 },
            { id: 5, img: "https://i.scdn.co/image/ab67616d00001e0216ba2a3622bd0d0d985e3234", price: "", id2: 9 },
            { id: 5, img: "https://i.scdn.co/image/ab67616d00001e0216ba2a3622bd0d0d985e3234", price: "", id2: 10 },
            { id: 6, img: "https://i.scdn.co/image/ab67616d00001e022f1a5b69c2bd76474bca8035", price: "", id2: 11 },
            { id: 6, img: "https://i.scdn.co/image/ab67616d00001e022f1a5b69c2bd76474bca8035", price: "", id2: 12 },
            { id: 7, img: "https://i.scdn.co/image/ab67616d00001e02fdd911dc550c527e1725dbd4", price: "", id2: 13 },
            { id: 7, img: "https://i.scdn.co/image/ab67616d00001e02fdd911dc550c527e1725dbd4", price: "", id2: 14 },
            { id: 8, img: "https://i.scdn.co/image/ab67616d00001e02ea012d09e9a7a6b48adf3f3d", price: "", id2: 15 },
            { id: 8, img: "https://i.scdn.co/image/ab67616d00001e02ea012d09e9a7a6b48adf3f3d", price: "", id2: 16 },
            { id: 9, img: "https://i.scdn.co/image/ab67616d00001e02df865c096835a346702f555a", price: "", id2: 17 },
            { id: 9, img: "https://i.scdn.co/image/ab67616d00001e02df865c096835a346702f555a", price: "", id2: 18 },
            { id: 10, img: "https://i.scdn.co/image/ab67616d00001e02d4ebebed612075da13d00be6", price: "", id2: 19 },
            { id: 10, img: "https://i.scdn.co/image/ab67616d00001e02d4ebebed612075da13d00be6", price: "", id2: 20 },
        ].sort(() => Math.random() - 0.5)
    );
    const [prev, setPrev] = useState<number>(-1);

    useEffect(() => {
        // Show all items initially
        const initialItems = items.map(item => ({ ...item, price: "active" }));
        setItems(initialItems);

        const timeout = setTimeout(() => {
            // Hide all items after 2 seconds
            const hiddenItems = initialItems.map(item => ({ ...item, price: "" }));
            setItems(hiddenItems);
        }, 2000);

        return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }, []);

    const check = (current: number) => {
        if (items[current].id === items[prev].id) {
            items[current].price = "correct";
            items[prev].price = "correct";
            setItems([...items]);
            setPrev(-1);
        } else {
            items[current].price = "wrong";
            items[prev].price = "wrong";
            setItems([...items]);
            setTimeout(() => {
                items[current].price = "";
                items[prev].price = "";
                setItems([...items]);
                setPrev(-1);
            }, 1000);
        }
    };

    const handleClick = (id: number) => {
        if (items[id].price === "correct" || items[id].price === "active") return;

        if (prev === -1) {
            items[id].price = "active";
            setItems([...items]);
            setPrev(id);
        } else {
            check(id);
        }
    };
    const isFlipped = (item: Item): string | boolean => {
        return item.isMatched || (item.price ? "active" + item.price : "");
    };

    const onCardClick = (item: Item): void => {
        if (!item.isMatched) {
            handleClick(items.indexOf(item));
        }
    };
    return (
        <FlipContext.Provider value={{ items, setItems, prev, setPrev, check, handleClick, isFlipped, onCardClick }}>
            {children}
        </FlipContext.Provider>
    );
};

export { FlipProvider };
export default FlipContext;




