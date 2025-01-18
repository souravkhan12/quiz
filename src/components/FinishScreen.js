import React from "react";
import { useQuiz } from "./context/QuizContext";

function FinishScreen() {
  const { points, totalPoints, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result ">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <div className="btn btn-ui" onClick={() => dispatch({ type: "Restart" })}>
        Restart
      </div>
    </>
  );
}

export default FinishScreen;
