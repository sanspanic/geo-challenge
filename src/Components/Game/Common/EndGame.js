import React, { useContext, useEffect, useState } from "react";
import GameContext from "../../../Context/GameContext";
import { Link } from "react-router-dom";
import img1 from "../../../Assets/loser.jpg";
import img2 from "../../../Assets/LostInForest.jpg";
import img8 from "../../../Assets/GoogleMaps.jpg";
import img7 from "../../../Assets/Inventor.jpg";
import img6 from "../../../Assets/Cartographer.jpg";
import img5 from "../../../Assets/compass.jpg";
import img4 from "../../../Assets/Ship.jpg";
import img3 from "../../../Assets/SatNav.jpg";
import { calculateRank, ranks } from "../Common/helpers";
import { Trophy } from "phosphor-react";
import backendAPI from "../../../API/backendAPI";

const EndGame = () => {
  const {
    setStatus,
    score,
    setScore,
    setMistakes,
    setLevel,
    mistakes,
    speedBonus,
    rank,
    setRank,
    status,
  } = useContext(GameContext);
  const [imgSrc, setImgSrc] = useState("");
  const [newHighScore, setNewHighScore] = useState(0);

  //update highscore
  useEffect(() => {
    if (!status.active) return;
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
  }, [score, status]);

  useEffect(() => {
    const rankNum = calculateRank(score);
    setRank(rankNum);
    if (rankNum === 8) {
      setImgSrc(img8);
    } else if (rankNum === 7) {
      setImgSrc(img7);
    } else if (rankNum === 6) {
      setImgSrc(img6);
    } else if (rankNum === 5) {
      setImgSrc(img5);
    } else if (rankNum === 4) {
      setImgSrc(img4);
    } else if (rankNum === 3) {
      setImgSrc(img3);
    } else if (rankNum === 2) {
      setImgSrc(img2);
    } else if (rankNum === 1) {
      setImgSrc(img1);
    }
  }, [score, setRank, setImgSrc]);

  const restart = () => {
    setLevel(1);
    setStatus({ isActive: false, isWon: false, isLost: false });
    setScore(0);
    setMistakes(5);
  };

  return (
    <div className="grid sm:grid-cols-2 my-5 gap-10">
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
        <img alt="rank" className="py-5" src={imgSrc}></img>
        <p className="max-w-sm">{ranks[0][rank].description}</p>
      </div>
    </div>
  );
};

export default EndGame;
