import { createContext, useContext } from "react";
import { useEffect, useReducer } from "react";

const SECS_PER_QUESTIONS = 30;
const QuizContext = createContext();

const initialState = {
  questions: [],
  // 'loading', 'error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };

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
      return {
        ...state,
        index: state.index + 1,
        status: state.index >= 14 ? "finished" : state.status,
        answer: null,
      };

    case "Restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        secondsRemaining: 10,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unkown");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    async function get_data() {
      try {
        const data = await fetch(
          "https://react-quiz-data-1.onrender.com/questions"
        );
        const res = await data.json();
        dispatch({ type: "dataReceived", payload: res });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    get_data();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        dispatch,
        numQuestions,
        totalPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("Quiz context used outside Provider");
  }

  return context;
}

export { useQuiz, QuizProvider };
