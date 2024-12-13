//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FishProvider } from "./context/FishProvider";
import { RevealProvider } from "./context/RevealProvider";
import { FlipProvider } from "./context/FlipProvider";

createRoot(document.getElementById("root")!).render(

  <FishProvider>
    <RevealProvider>
      <FlipProvider>
        <App /></FlipProvider>
    </RevealProvider>
  </FishProvider>

);
