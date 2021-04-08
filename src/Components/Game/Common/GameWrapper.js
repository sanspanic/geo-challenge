import React, { useContext, useState } from "react";
import GameContext from "../../../Context/GameContext";
import FlagLevel from "../FlagLevel/FlagLevel";

const GameWrapper = () => {
  const { level, status, setStatus } = useContext(GameContext);

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="bg-white bg-opacity-50 border p-10 max-w-screen-sm md:max-w-screen-md flex flex-col items-center">
        {status.isLost && <div>YA lost</div>}
        {status.isWon && <div>YA won</div>}
        {!status.isActive && (
          <h1 className="text-center font-black text-4xl col-start-2 col-span-6 mb-10">
            Level {level.num} - {level.title}
          </h1>
        )}
        {status.isActive ? (
          <>{level.num === 1 && <FlagLevel />}</>
        ) : (
          <button
            onClick={() => setStatus({ ...status, isActive: true })}
            className="px-4 py-2 bg-gradient-green rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110"
          >
            Start Level
          </button>
        )}
      </div>
    </div>
  );
};

export default GameWrapper;
