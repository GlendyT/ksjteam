import { useContext } from "react";
import RevealContext from "../context/RevealProvider";

const useReveal = () => {
  return useContext(RevealContext);
};

export default useReveal;
