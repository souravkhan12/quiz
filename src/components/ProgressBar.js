import React from "react";
import { useQuiz } from "./context/QuizContext";

function ProgressBar() {
  const { index, numQuestions, points, totalPoints } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index - 1} />
      <p>
        Question <strong>{index}</strong> / {numQuestions}
      </p>
      <p>
        <strong> Score : {points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default ProgressBar;
