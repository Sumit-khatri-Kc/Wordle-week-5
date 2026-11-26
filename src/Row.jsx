import Tile from "./Square.jsx";

export default function Row({ guess, statuses, rowNumber, isCurrentRow }) {
  return (
    <div className="board-row" aria-label={`Guess row ${rowNumber}`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={guess[index] || ""}
          status={statuses[index] || ""}
          isTyping={isCurrentRow && Boolean(guess[index]) && !statuses[index]}
        />
      ))}
    </div>
  );
}
