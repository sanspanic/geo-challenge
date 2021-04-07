import React, { useEffect, useState } from "react";
import backendAPI from "../../API/backendAPI";
import RotatingGlobe from "../Common/RotatingGlobe";
import { Planet } from "phosphor-react";
import ErrorDisplay from "../Common/ErrorDisplay";

const Board = () => {
  const [error, setError] = useState({ is: false, message: "", status: 0 });
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getScores = async () => {
      try {
        setIsLoading(true);
        const res = await backendAPI.getHighscores();
        setScores(res);
        setIsLoading(false);
        console.log(res);
      } catch (err) {
        setIsLoading(false);
        console.log("err from leaderboard: ", err);
        setError({
          is: true,
          message: err.response.data.error.message,
          status: err.response.data.error.status,
        });
      }
    };
    getScores();
  }, []);

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="flex justify-center items-center">
        <div className="bg-white bg-opacity-50 rounded shadow-xl place-self-center px-20 py-10">
          <h1 className="text-4xl font-black mb-10">
            Leaderboard 
            <Planet className="inline text-cerise-500" size={48} />{" "}
          </h1>
          <ul className="leaderboard">
            <li className="flex justify-between border-b border-black italic px-3">
              <span>Username</span>
              <span>Score</span>
            </li>
            {isLoading && <RotatingGlobe size={60} />}
            {error.is && (
              <ErrorDisplay message={error.message} status={error.status} />
            )}
            {scores.map((score, i) => (
              <li className="flex justify-between px-3 py-1">
                <span>
                  {i + 1}. {score.username}
                </span>
                <span>{score.highscore}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Board;
