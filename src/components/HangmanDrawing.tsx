const hangmanParts = [
  {
    key: "head",
    style: {
      width: "50px",
      height: "50px",
      borderRadius: "100%",
      border: "10px solid black",
      position: "absolute" as const, // Type casting
      top: "50px",
      right: "-20px",
    },
  },
  {
    key: "body",
    style: {
      width: "10px",
      height: "100px",
      backgroundColor: "black",
      position: "absolute" as const, // Type casting
      top: "100px",
      right: "0",
    },
  },
  {
    key: "right-arm",
    style: {
      width: "100px",
      height: "10px",
      backgroundColor: "black",
      position: "absolute" as const, // Type casting
      top: "150px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    },
  },
  {
    key: "left-arm",
    style: {
      width: "100px",
      height: "10px",
      backgroundColor: "black",
      position: "absolute" as const, // Type casting
      top: "150px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    },
  },
  {
    key: "right-leg",
    style: {
      width: "100px",
      height: "10px",
      backgroundColor: "black",
      position: "absolute" as const, // Type casting
      top: "190px",
      right: "-90px",
      rotate: "60deg",
      transformOrigin: "left bottom",
    },
  },
  {
    key: "left-leg",
    style: {
      width: "100px",
      height: "10px",
      backgroundColor: "black",
      position: "absolute" as const, // Type casting
      top: "190px",
      right: "0",
      rotate: "-60deg",
      transformOrigin: "right bottom",
    },
  },
];

export default function HangmanDrawing({ numberOfGuesses }: { numberOfGuesses: number }) {
  return (
    <div className="relative">
      {/* Render hangman parts dynamically based on guesses */}
      {hangmanParts.slice(0, numberOfGuesses).map(({ key, style }) => (
        <div key={key} style={style} />
      ))}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "black",
          position: "absolute" as const, // Type casting
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "black",
          marginLeft: "120px",
        }}
      />
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "black",
          marginLeft: "120px",
        }}
      />
      <div style={{ height: "10px", width: "250px", background: "black" }} />
    </div>
  );
}
