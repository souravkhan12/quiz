import React from "react";
import { useQuiz } from "./context/QuizContext";

function NextButton() {
  const { dispatch, answer } = useQuiz();
  if (answer == null) return null;
  return (
    <div
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </div>
  );
}

export default NextButton;
