import { Fishing } from "./components/Fishing";
import Waves from "./waves/Waves";


//import Waves from "./waves/Waves";

function App() {
  return (
    <div className="bg-[#2b74ce] flex flex-col min-h-screen ">
      <div className="flex-1 max-sm:flex">
        <Fishing />
      </div>
      <Waves />

    </div>
  );
}

export default App;
