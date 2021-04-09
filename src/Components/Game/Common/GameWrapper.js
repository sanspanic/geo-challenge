import React, { useContext, useState } from "react";
import GameContext from "../../../Context/GameContext";
import FlagLevel from "../FlagLevel/FlagLevel";
import EndGame from "./EndGame";

const GameWrapper = () => {
  const { level, status, setStatus, setLevel } = useContext(GameContext);
  const LEVEL_TITLES = {
    1: "Guess the Flag",
    2: "Guess the Capital",
  };

  const startLevel = () => {
    setStatus({ isLost: false, isWon: false, isActive: true });
  };

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="bg-white bg-opacity-50 border p-10 max-w-screen-sm md:max-w-screen-md flex flex-col items-center">
        {(status.isLost || status.isWon) && <EndGame />}
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
      </div>
    </div>
  );
};

export default GameWrapper;
