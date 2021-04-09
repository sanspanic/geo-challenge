import React, { useContext, useEffect, useState } from "react";
import GameContext from "../../../Context/GameContext";
import { Link } from "react-router-dom";
import Loser from "../../../Assets/loser.jpg";

const EndGame = () => {
  const {
    setStatus,
    status,
    score,
    setScore,
    setMistakes,
    setLevel,
    mistakes,
    speedBonus,
  } = useContext(GameContext);
  const [rank, setRank] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const text = {
    Loser: `Geographically speaking, you are not the sharpest tool in the shed. At
      any given moment in time, you are likely to be lost and actively
      searching for an exit door.`,
    Lost_in_Forest: `text for lost in forest`,
  };

  useEffect(() => {
    if (400 >= score > 300) {
      setRank("Can_Use_Compass");
    } else if (300 >= score > 200) {
      setRank("Franklin");
    } else if (200 >= score > 100) {
      setRank("Lost_in_Forest");
    } else if (score < 100) {
      setRank("Loser");
      setImgSrc(Loser);
    }
  }, [score, setRank]);

  const restart = () => {
    setLevel(1);
    setStatus({ isActive: false, isWon: false, isLost: false });
    setScore(0);
    setMistakes(5);
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="rounded flex flex-col items-center bg-white bg-opacity-50 border p-10 max-w-screen-sm md:max-w-screen-md">
        <h1 className="font-black text-4xl">
          {status.isWon ? "You made it!" : "You lost!"}
        </h1>
        <ul className="endgame my-10 w-full">
          <h3 className="text-center font-bold border-b border-black p-1">
            Final Tally
          </h3>
          <li className="flex justify-between px-3 py-1">
            <span>Speed bonus: </span>
            <span>
              {speedBonus / 50} x 50 = {speedBonus}
            </span>
          </li>
          <li className="flex justify-between px-3 py-1">
            <span>Accuracy bonus: </span>
            <span>
              {mistakes} x 50 = {mistakes * 50}
            </span>
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
      <div className="rank-card bg-white bg-opacity-50 border self-center p-10 rounded flex flex-col items-center self-stretch">
        <h1 className="text-4xl font-black text-center">
          Your Rank:{" "}
          <span className="text-cerise-500">{rank.replace("_", "")}</span>
        </h1>
        <img className="w-44 py-5" src={imgSrc}></img>
        <p className="max-w-sm">{text[rank]}</p>
      </div>
    </div>
  );
};

export default EndGame;
