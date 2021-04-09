import React, { useState, useEffect, useContext, useRef } from "react";
import GameContext from "../../../Context/GameContext";
import {
  makeUniqueSelection,
  pickWinner,
  isCorrect,
  gameLost,
  gameWon,
  nextLevel,
} from "../Common/helpers";
import Timer from "../Common/Timer";

const CapitalLevel = () => {
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

  const {
    hasLoaded,
    countries,
    setScore,
    setMistakes,
    mistakes,
    status,
    setStatus,
    setLevel,
    setWidth,
  } = useContext(GameContext);

  useEffect(() => {
    //uncomment if you add third level
    /*     if (nextLevel(turn)) {
      console.log("initiating next level");
      setLevel((l) => l + 1);
      setStatus({ ...status, isActive: false });
    } */

    if (gameWon(turn)) {
      console.log("YA WON");
      clearInterval(timerId.current);
      setStatus({ ...status, isWon: true, isActive: false });
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
  }, [turn, hasLoaded]);

  useEffect(() => {
    if (gameLost(mistakes)) {
      console.log("YA LOST");
      clearInterval(timerId.current);
      setStatus({ ...status, isLost: true, isActive: false });
    }
  }, [mistakes]);

  const handleClick = (e) => {
    if (isCorrect(e.target.innerText, winner.capital)) {
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
      <div className="grid capitals-grid grid-cols-8 gap-2 place-content-stretch place-items-stretch">
        <div
          className="cap h-full w-40 mx-1 col-span-4 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer  p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[0].capital}
        </div>
        <div
          className="h-full w-40 mx-1 col-start-5 col-span-4 md:col-start-3 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[1].capital}
        </div>
        <div
          className="h-full w-40 mx-1 col-start-1 col-span-4 md:col-start-5 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[2].capital}
        </div>
        <div
          className="h-full w-40 mx-1 col-start-5 col-span-4 md:col-start-7 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[3].capital}
        </div>
      </div>
      <Timer setTurn={setTurn} timerId={timerId} />
    </>
  );
};

export default CapitalLevel;
