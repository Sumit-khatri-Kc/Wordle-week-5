import Row from "./Row.jsx";

export default function Board({ pastGuesses, currentGuess, solutionWord }) {
  function getStatuses(guess) {
    const result = Array(5).fill("absent");
    const remaining = solutionWord.split("");

    guess.split("").forEach((letter, index) => {
      if (letter === solutionWord[index]) {
        result[index] = "correct";
        remaining[index] = null;
      }
    });

    guess.split("").forEach((letter, index) => {
      if (result[index] !== "correct") {
        const foundIndex = remaining.indexOf(letter);

        if (foundIndex !== -1) {
          result[index] = "present";
          remaining[foundIndex] = null;
        }
      }
    });

    return result;
  }

  return (
    <div className="board">
      {[0, 1, 2, 3, 4, 5].map((row) => {
        const guess =
          pastGuesses[row] ||
          (row === pastGuesses.length ? currentGuess : "");

        const statuses = pastGuesses[row]
          ? getStatuses(guess)
          : [];

        return (
          <Row
            key={row}
            guess={guess}
            statuses={statuses}
            rowNumber={row + 1}
            isCurrentRow={row === pastGuesses.length}
          />
        );
      })}
    </div>
  );
}
