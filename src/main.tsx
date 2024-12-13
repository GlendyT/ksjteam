//import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FlipProvider } from "./context/FlipProvider";

createRoot(document.getElementById("root")!).render(
  <FlipProvider>
    <App />
  </FlipProvider>
);
