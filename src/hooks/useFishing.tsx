import { useContext } from "react";
import FishContext from "../context/FishProvider";

const useFish = () => {
    return useContext(FishContext)
}

export default useFish