import { useEffect, useState } from "react";
import Board from "./Board.jsx";
import Keyboard from "./Keyboard.jsx";
import Scoreboard from "./Scoreboard.jsx";

const WORDS = [
  "APPLE", "BRAVE", "CHAIR", "DREAM",
  "FLAME", "GRAPE", "HOUSE", "LIGHT",
  "MONEY", "PLANT", "SMILE", "TRAIN"
];

function chooseWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function checkGuess(guess, solutionWord) {
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

export default function App() {
  const [solutionWord, setSolutionWord] = useState(chooseWord);
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [message, setMessage] = useState("Guess the 5-letter word!");

  const keyboardStatuses = {};

  pastGuesses.forEach((guess) => {
    checkGuess(guess, solutionWord).forEach((status, index) => {
      const letter = guess[index];
      const oldStatus = keyboardStatuses[letter];
      const priority = { absent: 1, present: 2, correct: 3 };

      if (!oldStatus || priority[status] > priority[oldStatus]) {
        keyboardStatuses[letter] = status;
      }
    });
  });

  function handleKey(key) {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "Backspace") {
      setCurrentGuess((guess) => guess.slice(0, -1));
      return;
    }

    if (key === "Enter") {
      if (currentGuess.length !== 5) {
        setMessage("Please enter 5 letters.");
        return;
      }

      const nextGuesses = [...pastGuesses, currentGuess];

      setPastGuesses(nextGuesses);
      setCurrentGuess("");

      if (currentGuess === solutionWord) {
        setGameStatus("WON");
        setMessage("Excellent! You found the word.");
      } else if (nextGuesses.length === 6) {
        setGameStatus("LOST");
        setMessage(`The correct word was ${solutionWord}.`);
      } else {
        setMessage("Try another word.");
      }

      return;
    }

    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((guess) => (guess + key.toUpperCase()).slice(0, 5));
      setMessage("Guess the 5-letter word!");
    }
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (
        event.key === "Backspace" ||
        event.key === "Enter" ||
        /^[a-zA-Z]$/.test(event.key)
      ) {
        event.preventDefault();
        handleKey(event.key);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gameStatus, currentGuess, pastGuesses, solutionWord]);

  function newGame() {
    setSolutionWord(chooseWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("Guess the 5-letter word!");
  }

  const attemptsLeft = 6 - pastGuesses.length;

  return (
    <main className="game">
      <header className="header">
        <h1>WORDLE</h1>
        <p>A five-letter word puzzle</p>
      </header>

      <p className="status" role="status">
        {message}
      </p>

      <Board
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solutionWord={solutionWord}
      />

      <Keyboard
        onKey={handleKey}
        keyStatuses={keyboardStatuses}
        disabled={gameStatus !== "IN_PROGRESS"}
      />

      <Scoreboard
        attemptsLeft={attemptsLeft}
        pastGuesses={pastGuesses}
      />

      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-backdrop">
          <section className="dialog">
            <h2>
              {gameStatus === "WON" ? "You won!" : "Game over"}
            </h2>

            <p>
              {gameStatus === "WON"
                ? "Well done. You guessed the word."
                : `The hidden word was ${solutionWord}.`}
            </p>

            <button className="new-game" onClick={newGame}>
              Play again
            </button>
          </section>
        </div>
      )}

      <button className="reset-button" onClick={newGame}>
        New game
      </button>

      <footer>
        Green = correct place · Yellow = in the word · Gray = not in the word
      </footer>
    </main>
  );
}
