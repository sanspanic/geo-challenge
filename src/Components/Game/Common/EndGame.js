import React, { useContext, useEffect, useState } from "react";
import GameContext from "../../../Context/GameContext";
import { Link } from "react-router-dom";

const EndGame = () => {
  const {
    setStatus,
    status,
    score,
    setScore,
    setMistakes,
    setLevel,
  } = useContext(GameContext);
  const [rank, setRank] = useState("");

  useEffect(() => {
    if (score < 100) {
      setRank("Loser");
    }
  }, [score]);

  const restart = () => {
    setLevel(1);
    setStatus({ isActive: false, isWon: false, isLost: false });
    setScore(0);
    setMistakes([]);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-black text-4xl">
        {status.isWon ? "You made it!" : "You lost!"}
      </h1>
      <ul className="endgame my-10">
        <h3 className="text-center font-bold">Final Tally</h3>
        <li className="flex justify-between px-3 py-1">
          <span>Speed bonus: </span>
          <span>100</span>
        </li>
        <li className="flex justify-between px-3 py-1">
          <span>Mistake penalty: </span>
          <span>100</span>
        </li>
        <li className="flex justify-between px-3 py-1">
          <span>Final score: </span>
          <span className="font-bold">{score}</span>
        </li>
        <li className="flex justify-between px-3 py-1 text-cerise-500 font-bold">
          Final rank: {rank}
        </li>
      </ul>
      <p className="text-gray-600 pb-5">
        Did you make it to the{" "}
        <Link to="leaderboard" className="underline italic text-black">
          Leaderboard
        </Link>
        ?
      </p>
      <button
        onClick={restart}
        className="px-4 py-2 bg-gradient-green rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110"
      >
        Play again!
      </button>
    </div>
  );
};

export default EndGame;
