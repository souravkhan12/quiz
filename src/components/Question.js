import React from "react";
import Options from "./Options";
import { useQuiz } from "./context/QuizContext";

function Question() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h3>{questions[index].question}</h3>
      <Options />
    </div>
  );
}

export default Question;
