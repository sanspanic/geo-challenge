import React, { useContext, useState, useEffect } from "react";
import GameContext from "../../../Context/GameContext";
import {
  makeUniqueSelection,
  pickWinner,
  isCorrect,
  gameWon,
  gameLost,
} from "../Common/helpers";
import Timer from "../Common/Timer";

const FlagLevel = () => {
  const { countries, hasLoaded, setScore, status, setStatus } = useContext(
    GameContext
  );
  const [selection, setSelection] = useState([
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
  ]);
  const [winner, setWinner] = useState({ name: "", flag: "", capital: "" });
  //each level will have 20 turns
  const [turn, setTurn] = useState(1);
  const [mistakes, setMistakes] = useState(["mistake"]);

  useEffect(() => {
    if (gameWon(turn)) {
      console.log("YA WON");
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
  }, [hasLoaded, turn]);

  useEffect(() => {
    if (gameLost(mistakes)) {
      console.log("YA LOST");
      setStatus({ ...status, isLost: true, isActive: false });
    }
  }, [mistakes]);

  //1. get 4 random numbers between 0 and 249 - make sure these are unique
  //2. save selected four countries to state
  //3. pick random winner and save to state
  //4. render 4 flags

  const handleClick = (e) => {
    if (isCorrect(e.target.src, winner.flag)) {
      setScore((s) => s + 100);
    } else {
      setMistakes([...mistakes, "mistake"]);
      console.log(mistakes);
    }
    setTurn((turn) => turn + 1);
  };

  return (
    <>
      <h1 className="text-center font-black text-4xl col-start-2 col-span-6 mb-10">
        {winner.name}
      </h1>
      <div className="grid auto-rows-fr grid-cols-8 gap-2 place-items-stretch place-content-stretch">
        <img
          onClick={handleClick}
          alt="flag"
          src={selection[0].flag}
          className="shadow-xl rounded p-2 bg-gradient-gray mx-1 col-span-4 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
        />
        <img
          onClick={handleClick}
          alt="flag"
          src={selection[1].flag}
          className=" shadow-xl p-2 bg-gradient-gray mx-1 col-start-5 col-span-4 md:col-start-3 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
        />
        <img
          onClick={handleClick}
          alt="flag"
          src={selection[2].flag}
          className="shadow-xl p-2 bg-gradient-gray mx-1 col-start-1 col-span-4 md:col-start-5 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
        />
        <img
          onClick={handleClick}
          alt="flag"
          src={selection[3].flag}
          className="shadow-xl p-2 bg-gradient-gray mx-1 col-start-5 col-span-4 md:col-start-7 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer"
        />
      </div>
      <Timer mistakes={mistakes} />
    </>
  );
};

export default FlagLevel;
