export default function Scoreboard({ attemptsLeft, pastGuesses }) {
  return (
    <section className="scoreboard">
      <p>
        <strong>Attempts remaining:</strong> {attemptsLeft}
      </p>

      <p>
        <strong>Guesses submitted:</strong> {pastGuesses.length}
      </p>
    </section>
  );
}
