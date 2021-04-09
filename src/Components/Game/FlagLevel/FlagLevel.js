import React, { useContext, useState, useEffect } from "react";
import GameContext from "../../../Context/GameContext";
import {
  makeUniqueSelection,
  pickWinner,
  isCorrect,
  gameWon,
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

  useEffect(() => {
    if (gameWon(turn)) {
      console.log("YA WON");
      setStatus({ ...status, isWon: true, isActive: false });
    }

    if (nextLevel(turn)) {
      console.log("initiating next level");
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
    }
  }, [mistakes]);

  const handleClick = (e) => {
    if (isCorrect(e.target.src, winner.flag)) {
      setScore((s) => s + 100);
    } else {
      setMistakes([...mistakes, "mistake"]);
    }
    setTurn((turn) => turn + 1);
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
      <Timer mistakes={mistakes} />
    </>
  );
};

export default FlagLevel;
