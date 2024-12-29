import { useEffect, useReducer } from "react";
import Header from "../Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressBar from "./ProgressBar";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  // 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    default:
      throw new Error("Action unkown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function get_data() {
      try {
        const data = await fetch("http://localhost:8000/questions");
        const res = await data.json();
        dispatch({ type: "dataReceived", payload: res });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    get_data();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              index={index + 1}
              numQuestion={numQuestions}
              points={points}
              totalPoints={totalPoints}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} maxPossiblePoints={totalPoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
