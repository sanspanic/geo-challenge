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
    setWidth,
    width,
    speedBonus,
    setSpeedBonus,
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
      if (width >= 70) {
        setSpeedBonus(speedBonus + 50);
      }
      setScore((s) => s + 100);
    } else {
      setMistakes((m) => m - 1);
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
      <Timer setTurn={setTurn} timerId={timerId} />
    </>
  );
};

export default FlagLevel;
