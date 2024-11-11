import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FishProvider } from "./context/FishProvider";
import { RevealProvider } from "./context/RevealProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FishProvider>
      <RevealProvider>
        <App />
      </RevealProvider>
    </FishProvider>
  </StrictMode>
);
