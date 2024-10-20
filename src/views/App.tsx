import { Link } from "react-router-dom";
import { links } from "./Pages";

function App() {
  return (
    <>
      <div>
        <p className="text-blue-600 text-2xl">Team Kim Seokjin</p>
        <div>Fishing with TEAM KIM SEOKJIN</div>
        <div>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-blue-600 "
              aria-label={label}
            >Click here to start the game</Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
