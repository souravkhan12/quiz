import React from "react";

function ProgressBar({ index, numQuestion, points, totalPoints }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index - 1} />
      <p>
        Question <strong>{index}</strong> / {numQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
