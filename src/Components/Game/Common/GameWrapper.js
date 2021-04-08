import React, { useContext, useState } from "react";
import GameContext from "../../../Context/GameContext";
import FlagLevel from "../FlagLevel/FlagLevel";

const GameWrapper = () => {
  const { level } = useContext(GameContext);

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="bg-white bg-opacity-50 border p-10 max-w-screen-sm md:max-w-screen-md">
        <h1 className="text-center font-black text-4xl col-start-2 col-span-6">
          Level {level.num} - {level.title}
        </h1>
        {level.num === 1 && <FlagLevel />}
        <div className="timer col-start-1 col-span-8 border border-black"></div>
      </div>
    </div>
  );
};

export default GameWrapper;
