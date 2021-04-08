import React, { useState } from "react";
import GameContext from "./GameContext";

const GameContextProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider value={{ level, setLevel, score, setScore }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
