import { Fishing } from "./components/Fishing";
import Waves from "./waves/Waves";

function App() {
  return (
    <div className="bg-[#2b74ce] flex flex-col min-h-[100vh] ">
      <div className="flex-1">
        <Fishing />
      </div>
      <Waves />
    </div>
  );
}

export default App;
