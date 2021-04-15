import React, { useContext, useEffect } from "react";
import { HeartStraight } from "phosphor-react";
import GameContext from "../../../Context/GameContext";
import { v4 as uuid } from "uuid";

const Timer = ({ setTurn, timerId }) => {
  const { setWidth, setMistakes, mistakes, width, score } = useContext(
    GameContext
  );

  //initiate interval to decrease width with time
  useEffect(() => {
    clearInterval(timerId.current);
    timerId.current = setInterval(() => {
      setWidth((w) => {
        return w - 1;
      });
    }, 50);
  }, [setWidth, timerId]);

  //handle timeOut
  useEffect(() => {
    console.log("timer resetting");
    if (width === 0) {
      setMistakes((m) => m - 1);
      setTurn((t) => t + 1);
      setWidth(100);
    }
  }, [width, setMistakes, setTurn, setWidth]);

  return (
    <>
      <div className="w-40 my-6 border-2 border-cerise-500 rounded-xl bg-gradient-pale p-2 bg-gradient-gray">
        <div className="text-center">
          Score: <span className="text-xl font-bold">{score}</span>
        </div>
        <div className="text-center">
          {Array.from({ length: mistakes }).map((m) => (
            <HeartStraight
              key={uuid()}
              className="inline text-cerise-500 my-1"
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
