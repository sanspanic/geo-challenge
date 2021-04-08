import React, { useContext } from "react";
import { SmileyXEyes } from "phosphor-react";
import GameContext from "../../../Context/GameContext";

const Timer = ({ mistakes }) => {
  const { score } = useContext(GameContext);
  return (
    <>
      <div className="w-40 my-6 border border-black rounded bg-white p-2">
        <div className="text-center">
          Score: <span className="text-xl font-bold">{score}</span>
        </div>
        <div className="text-center">
          {mistakes.map((m) => (
            <SmileyXEyes className="inline text-red-600 my-1" size={24} />
          ))}
        </div>
      </div>
      <div className="self-stretch col-start-1 col-span-8 border-2 border-black">
        <div className="bg-gradient-purple timer"></div>
      </div>
    </>
  );
};

export default Timer;
