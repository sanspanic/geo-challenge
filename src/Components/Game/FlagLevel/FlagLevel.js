import React, { useContext, useState, useEffect, useRef } from "react";
import GameContext from "../../../Context/GameContext";
import {
  makeUniqueSelection,
  pickWinner,
  isCorrect,
  gameLost,
  nextLevel,
} from "../Common/helpers";
import Timer from "../Common/Timer";
import { SmileyXEyes } from "phosphor-react";
import { v4 as uuid } from "uuid";

const FlagLevel = () => {
  const {
    countries,
    hasLoaded,
    setScore,
    status,
    setStatus,
    setLevel,
    mistakes,
    setMistakes,
    score,
    width,
    setWidth,
  } = useContext(GameContext);

  const [selection, setSelection] = useState([
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
  ]);

  const [winner, setWinner] = useState({ name: "", flag: "", capital: "" });
  //each level will have 20 turns
  const [turn, setTurn] = useState(1);
  const timerId = useRef();

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

  useEffect(() => {
    if (nextLevel(turn)) {
      console.log("initiating next level");
      clearInterval(timerId.current);
      setLevel((l) => l + 1);
      setStatus({ ...status, isActive: false });
    }

    const indexArr = makeUniqueSelection();
    let selectionArr = [];
    for (let idx of indexArr) {
      selectionArr.push(countries[idx]);
    }
    if (hasLoaded) {
      setSelection(selectionArr);
      setWinner(pickWinner(selectionArr));
    }
  }, [hasLoaded, turn]);

  useEffect(() => {
    if (gameLost(mistakes)) {
      console.log("YA LOST");
      setStatus({ ...status, isLost: true, isActive: false });
      clearInterval(timerId.current);
    }
  }, [mistakes]);

  const handleClick = (e) => {
    if (isCorrect(e.target.src, winner.flag)) {
      setScore((s) => s + 100);
    } else {
      setMistakes([...mistakes, "mistake"]);
    }
    setTurn((turn) => turn + 1);
    setWidth(100);
  };

  return (
    <>
      <h1 className="text-center font-black text-4xl col-start-2 col-span-6 mb-10">
        {winner.name}
      </h1>
      <div className="grid flags-grid grid-cols-8 gap-2 place-content-stretch place-items-stretch">
        <img
          className="h-full w-40 mx-1 col-span-4 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer"
          onClick={handleClick}
          alt="flag"
          src={selection[0].flag}
        />

        <img
          className="h-full w-40 mx-1 col-start-5 col-span-4 md:col-start-3 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer"
          onClick={handleClick}
          alt="flag"
          src={selection[1].flag}
        />
        <img
          className="h-full w-40 mx-1 col-start-1 col-span-4 md:col-start-5 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
          onClick={handleClick}
          alt="flag"
          src={selection[2].flag}
        />
        <img
          className="h-full w-40 mx-1 col-start-5 col-span-4 md:col-start-7 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
          onClick={handleClick}
          alt="flag"
          src={selection[3].flag}
        />
      </div>
      {/*       <Timer setTurn={setTurn} turn={turn} timerId={timerId} /> */}
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

export default FlagLevel;
