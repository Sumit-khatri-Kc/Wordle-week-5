export default function Square({ letter, status, isTyping }) {
  const className = [
    "tile",
    status ? `tile-${status}` : "",
    isTyping ? "tile-typing" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {letter}
    </div>
  );
}
