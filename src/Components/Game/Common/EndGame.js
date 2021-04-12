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
import { getPercentile } from "../Common/helpers";
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
  const [previousHighscore, setPreviousHighscore] = useState(0);

  //must be arr to pass in as react child
  const ranks = [
    {
      1: {
        description: `Geographically speaking, you are not the sharpest tool in the shed. At
      any given moment in time, you are likely to be lost and actively
      searching for an exit door.`,
        name: "Loser",
      },
      2: {
        name: "Lost in Forest",
        description: `You are walking around a dark spooky forest, hopelessly lost. The twigs creak beneath your steps as you wonder whether you will ever see your loved ones again. Given your subpar sense of direction, you will likely not.`,
      },
      3: {
        name: "Sat-Nav-Dependant",
        description: `Ouch. You are not very good at this. You rarely leave your home without your phone and are navigationally challenged, frequently getting lost in- as well as outdoors. As a child, you were scared of supermarkets because they meant having to endure strangers shouting "if you lost your kid please come to the counter" into a radio.`,
      },
      4: {
        name: "Franklin",
        description: `You are an adventurous explorer with a soft spot for the Arctic. However, you're not as good at Geography as you think you are. In search of the Northwest Passage, you steer 2 ships into ice and question your life choices as you watch your entire crew slowly freeze and starve to death. You die wishing a TV show was made about you and your wish is granted.`,
      },
      5: {
        name: "Can Use Compass",
        description: `You're not great at this, but you are able to use a compass and have a mental model of cardinal directions. You have heard that moss only grows on one side of the trees, and would use this knowledge to your advantage, if only you remembered which side. `,
      },
      6: {
        name: "Cartographer",
        description: `Not bad! You appear to be obsessed with maps. You firmly believe that reality can and should be modelled in ways that communicate spatial information effectively. You enjoy walking and tend to establish yourself as the "maps guy" during every hike as a result your compulsive need to check a map every 2 minutes.`,
      },
      7: {
        name: "Inventor of GPS",
        description: `You're so good at geography that you invented GPS. This means you are owned by the US goverment and operated by the US Space Force. You're pretty good at providing geolocation, but require an unobstructed line of sight to 4 or more satellites. Obstacles such as mountains and buildings confuse you, and you hate them.`,
      },
      8: {
        name: "Google Maps",
        description: `Wow! You really know your stuff! Be it real-time traffic conditions, satellite imagery, or interactive panoramic views - you can do it all! With little to no concern to anyone's privacy, you can navigate your way out of any situation. Well done!`,
      },
    },
  ];

  //retrieve user highscore, if new highscore bigger, then update highscore
  useEffect(() => {
    setScore(1200);
    const getCurrHighscore = async (score) => {
      try {
        const { highscore } = await backendAPI.getUser(
          JSON.parse(localStorage.getItem("user")).username
        );
        setPreviousHighscore(highscore);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrHighscore();
  }, [score]);

  useEffect(() => {
    const updateHighscore = async (score) => {
      try {
        const res = await backendAPI.updateHighscore(
          JSON.parse(localStorage.getItem("user")).username,
          score
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("retrieved previous at", previousHighscore);
    if (previousHighscore < score) {
      console.log("update highscore");
      updateHighscore(score);
    }
  }, [previousHighscore]);

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
      setImgSrc(1);
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
