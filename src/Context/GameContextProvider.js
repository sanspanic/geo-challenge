import React, { useState } from "react";
import GameContext from "./GameContext";

const GameContextProvider = ({ children }) => {
  const [level, setLevel] = useState({ num: 1, title: "Guess The Flag" });
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider value={{ level, setLevel, score, setScore }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
