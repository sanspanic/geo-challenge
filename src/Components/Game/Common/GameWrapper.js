import React, { useContext } from "react";
import GameContext from "../../../Context/GameContext";
import FlagLevel from "../FlagLevel/FlagLevel";

const GameWrapper = () => {
  const { level, levelTitle } = useContext(GameContext);

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="bg-white bg-opacity-50 border p-10 grid grid-cols-8 gap-2">
        <h1 className="text-center font-black text-4xl col-start-2 col-span-6">
          Level {level.num} - {level.title}
        </h1>
        <div className="col-span-4 md:col-span-2 border border-black">
          Flag 1
        </div>
        <div className="col-start-5 col-span-4 md:col-start-3 md:col-span-2 border border-black">
          Flag 1
        </div>
        <div className="col-span-4 md:col-start-5 md:col-span-2 border border-black">
          Flag 1
        </div>
        <div className="col-start-5 col-span-4 md:col-start-7 md:col-span-2 border border-black">
          Flag 1
        </div>
        {level === 1 && <FlagLevel />}
        <div className="timer col-start-1 col-span-8 border border-black"></div>
      </div>
    </div>
  );
};

export default GameWrapper;
