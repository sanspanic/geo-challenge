import React, { useContext, useEffect, useState } from "react";
import { SmileyXEyes } from "phosphor-react";
import GameContext from "../../../Context/GameContext";
import { v4 as uuid } from "uuid";
import { gameLost, nextLevel } from "./helpers";

const Timer = ({ setTurn, turn, timerId }) => {
  const { score, mistakes, setMistakes, width, setWidth } = useContext(
    GameContext
  );

  useEffect(() => {
    setWidth(100);
    timerId.current = setInterval(() => {
      console.log("I am running");
      setWidth((w) => w - 0.5);
      console.log("width: ", width);
    }, 20);
  }, [turn]);

  //stops interval on width -1
  useEffect(() => {
    if (width < 0) {
      console.log("should stop interval now");
      clearInterval(timerId.current);
      setMistakes([...mistakes, "mistake"]);
      setTurn((t) => t + 1);
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
