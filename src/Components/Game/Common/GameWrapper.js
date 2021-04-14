import React, { useContext, useEffect } from "react";
import GameContext from "../../../Context/GameContext";
import FlagLevel from "../FlagLevel/FlagLevel";
import EndGame from "./EndGame";
import CapitalLevel from "../CapitalLevel/CapitalLevel";
import MapLevel from "../MapsLevel/MapLevel";

const GameWrapper = () => {
  const { level, status, setStatus, setLevel, setWidth, setScore } = useContext(
    GameContext
  );
  const LEVEL_TITLES = {
    1: "Guess the Flag",
    2: "Guess the Capital",
    3: "Guess the Location",
  };

  const startLevel = () => {
    setStatus({ isLost: false, isWon: false, isActive: true });
  };

  //make sure new game starts when "game" is clicked, otherwise will display previous endgame state
  useEffect(() => {
    setStatus({ isLost: false, isWon: false, isActive: false });
    setLevel(1);
    setWidth(100);
    setScore(0);
  }, [setStatus, setLevel, setWidth]);

  return (
    <div className="py-5 bg-earth flex-grow flex place-items-center place-content-center">
      {status.isLost || status.isWon ? (
        <EndGame />
      ) : (
        <div className="bg-white bg-opacity-50 border p-10 max-w-screen-sm md:max-w-screen-md flex flex-col items-center">
          {!(status.isActive || status.isWon || status.isLost) && (
            <>
              <h1 className="text-center font-black text-4xl col-start-2 col-span-6 mb-10">
                Level {level} - {LEVEL_TITLES[level]}
              </h1>
              <button
                onClick={startLevel}
                className="px-4 py-2 bg-gradient-green rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110"
              >
                Start Level
              </button>
            </>
          )}
          {status.isActive && <>{level === 1 && <FlagLevel />}</>}
          {status.isActive && level === 2 && <CapitalLevel />}
          {status.isActive && level === 3 && <MapLevel />}
        </div>
      )}
    </div>
  );
};

export default GameWrapper;
