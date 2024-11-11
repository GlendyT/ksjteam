import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FishProvider } from "./context/FishProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FishProvider>
      <App />
    </FishProvider>
  </StrictMode>
);
