import jin from "../assets/jin.png";

const VerticalLine = () => {
  return (
    <div
      className="line"
      style={{
        width: "5px",
        height: "50px",
        backgroundColor: "black",
        margin: "2px 0",
      }}
    />
  );
};

export const HangmanDrawing = ({ correctGuessCount }) => {
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img src={jin} alt="Jin" style={{ width: "700px", height: "auto" }} />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 230,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {Array.from({ length: correctGuessCount }).map((_, index) => (
          <VerticalLine key={index} />
        ))}
      </div>
    </div>
  );
};
