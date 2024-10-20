import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./views/App.tsx";
import { Fishing } from "./components/Fishing.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} index />
        <Route path="fishing" element={<Fishing />} />
      </Routes>
    </BrowserRouter>
  );
}
