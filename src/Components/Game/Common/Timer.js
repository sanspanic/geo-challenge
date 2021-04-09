import React, { useContext, useEffect, useState } from "react";
import { SmileyXEyes } from "phosphor-react";
import GameContext from "../../../Context/GameContext";
import { v4 as uuid } from "uuid";
import { gameLost, nextLevel } from "./helpers";

const Timer = ({ setTurn, timerId }) => {
  const { setWidth, setMistakes, mistakes, width, score } = useContext(
    GameContext
  );

  //initiate interval to decrease width with time
  useEffect(() => {
    timerId.current = setInterval(() => {
      setWidth((w) => {
        console.log(w);
        return w - 1;
      });
    }, 50);
  }, []);

  //handle timeOut
  useEffect(() => {
    if (width === 0) {
      setMistakes([...mistakes, "mistake"]);
      setTurn((t) => t + 1);
      setWidth(100);
    }
  }, [width]);

  return (
    <>
      <div className="w-40 my-6 border border-black rounded bg-white p-2">
        <div className="text-center">
          Score: <span className="text-xl font-bold">{score}</span>
        </div>
        <div className="text-center">
          {mistakes.map((m) => (
            <SmileyXEyes
              key={uuid()}
              className="inline text-red-600 my-1"
              size={24}
            />
          ))}
        </div>
      </div>
      <div className="self-stretch col-start-1 col-span-8 border-2 border-black">
        <div
          style={{ width: `${width}%` }}
          className="bg-gradient-purple timer"
        ></div>
      </div>
    </>
  );
};

export default Timer;
