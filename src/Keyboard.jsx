export default function Keyboard({ onKey, keyStatuses, disabled }) {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M", "Backspace", "Enter"]
  ];

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const status = keyStatuses[key] || "";

            const className = [
              "key",
              key === "Backspace" || key === "Enter" ? "key-wide" : "",
              status ? `key-${status}` : ""
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={key}
                className={className}
                disabled={disabled}
                onClick={() =>
                  onKey(
                    key === "Backspace"
                      ? "Backspace"
                      : key === "Enter"
                      ? "Enter"
                      : key
                  )
                }
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
