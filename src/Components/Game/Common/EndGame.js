import React, { useContext, useEffect, useState } from "react";
import GameContext from "../../../Context/GameContext";
import { Link } from "react-router-dom";
import Loser from "../../../Assets/loser.jpg";
import LostInForest from "../../../Assets/LostInForest.jpg";
import GoogleMaps from "../../../Assets/GoogleMaps.jpg";
import Inventor from "../../../Assets/Inventor.jpg";
import Cartographer from "../../../Assets/Cartographer.jpg";
import Compass from "../../../Assets/compass.jpg";
import Ship from "../../../Assets/Ship.jpg";
import SatNav from "../../../Assets/SatNav.jpg";
import { getPercentile, ranks } from "../Common/helpers";
import { Trophy } from "phosphor-react";
import backendAPI from "../../../API/backendAPI";

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
  const [rank, setRank] = useState(1);
  const [imgSrc, setImgSrc] = useState("");
  const [newHighScore, setNewHighScore] = useState(0);

  //update highscore
  useEffect(() => {
    setScore(1207);
    const tryUpdateScore = async () => {
      try {
        const res = await backendAPI.updateHighscore(
          JSON.parse(localStorage.getItem("user")).username,
          { score }
        );
        console.log(res);
        if (res.highscore) {
          setNewHighScore(res.highscore);
        }
      } catch (err) {
        console.log(err);
      }
    };
    tryUpdateScore();
  }, [score]);

  useEffect(() => {
    const percentile = getPercentile(score);
    if (percentile > (100 / 8) * 7) {
      setRank(8);
      setImgSrc(GoogleMaps);
    } else if ((100 / 8) * 7 >= percentile && percentile > (100 / 8) * 6) {
      setRank(7);
      setImgSrc(Inventor);
    } else if ((100 / 8) * 6 >= percentile && percentile > (100 / 8) * 5) {
      setRank(6);
      setImgSrc(Cartographer);
    } else if ((100 / 8) * 5 >= percentile && percentile > (100 / 8) * 4) {
      setRank(5);
      setImgSrc(Compass);
    } else if ((100 / 8) * 4 >= percentile && percentile > (100 / 8) * 3) {
      setRank(4);
      setImgSrc(Ship);
    } else if ((100 / 8) * 3 >= percentile && percentile > (100 / 8) * 2) {
      setRank(3);
      setImgSrc(SatNav);
    } else if ((100 / 8) * 2 >= percentile && percentile > 100 / 8) {
      setRank(2);
      setImgSrc(LostInForest);
    } else if (percentile <= 100 / 8) {
      setRank(1);
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
        <h2 className="font-black text-4xl">Game Over!</h2>
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
            Final rank: <span>{ranks[0][rank].name}</span>
          </li>
          <li className="flex justify-between px-3 py-1 font-bold">
            Next rank:{" "}
            {rank === 8 ? (
              <span>
                You're already the best <Trophy className="inline" size={28} />
              </span>
            ) : (
              <span>{ranks[0][rank + 1].name}</span>
            )}
          </li>
        </ul>
        {newHighScore === 0 ? null : (
          <p className="text-cerise-500">NEW HIGHSCORE!</p>
        )}
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
        <h2 className="text-4xl font-black text-center">
          Your Rank:
          <span className="text-cerise-500"> {ranks[0][rank].name}</span>
        </h2>
        <img className="py-5" src={imgSrc}></img>
        <p className="max-w-sm">{ranks[0][rank].description}</p>
      </div>
    </div>
  );
};

export default EndGame;
