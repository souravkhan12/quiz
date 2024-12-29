import React from "react";

function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result ">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <div className="btn btn-ui" onClick={() => dispatch({ type: "Restart" })}>
        Restart
      </div>
    </>
  );
}

export default FinishScreen;
