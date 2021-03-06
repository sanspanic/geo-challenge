import React, { useState, useEffect, useContext, useRef } from "react";
import GameContext from "../../../Context/GameContext";
import SoundContext from "../../../Context/SoundContext";
import {
  makeUniqueSelection,
  pickWinner,
  isCorrect,
  gameLost,
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
  const [turn, setTurn] = useState(0);
  const timerId = useRef();

  const {
    hasLoaded,
    countries,
    setScore,
    setLives,
    lives,
    status,
    setStatus,
    setSpeedBonus,
    setWidth,
    width,
    setLevel,
  } = useContext(GameContext);
  const {
    playCorrect,
    playWrong,
    playLevelUp,
    playGameOver,
    playGameWon,
  } = useContext(SoundContext);

  useEffect(() => {
    if (nextLevel(turn)) {
      clearInterval(timerId.current);
      //make sure only logged in users get to further levels
      if (!JSON.parse(localStorage.getItem("user"))) {
        setTimeout(() => {
          playGameWon();
        }, 1000);
        setStatus({ ...status, isActive: false, isWon: true });
        return;
      }
      setTimeout(() => {
        playLevelUp();
      }, 1000);
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
  }, [
    turn,
    hasLoaded,
    countries,
    setLevel,
    setStatus,
    status,
    playCorrect,
    playLevelUp,
    playGameWon,
  ]);

  useEffect(() => {
    if (gameLost(lives)) {
      setTimeout(() => {
        playGameOver();
      }, 1000);
      clearInterval(timerId.current);
      setStatus({ ...status, isLost: true, isActive: false });
    }
  }, [lives, setStatus, status, playGameOver]);

  const handleClick = (e) => {
    if (isCorrect(e.target.innerText, winner.capital)) {
      if (width >= 70) {
        setSpeedBonus((b) => b + 50);
      }
      playCorrect();
      setScore((s) => s + 100);
    } else {
      playWrong();
      setLives((m) => m - 1);
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
          className="text-xs sm:text-base w-24 sm:w-40 mx-1 col-span-4 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer  p-2 sm:p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[0].capital}
        </div>
        <div
          className="text-xs sm:text-base w-24 sm:w-40 mx-1 col-start-5 col-span-4 md:col-start-3 md:col-span-2 transform-gpu hover:scale-110 duration-500 cursor-pointer p-2 sm:p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[1].capital}
        </div>
        <div
          className="text-xs sm:text-base w-24 sm:w-40 mx-1 col-start-1 col-span-4 md:col-start-5 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer p-2 sm:p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
          onClick={handleClick}
        >
          {selection[2].capital}
        </div>
        <div
          className="text-xs sm:text-base w-24 sm:w-40 mx-1 col-start-5 col-span-4 md:col-start-7 md:col-span-2  transform-gpu hover:scale-110 duration-500 cursor-pointer p-2 sm:p-3 text-center bg-gradient-green text-white font-bold rounded-2xl"
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
