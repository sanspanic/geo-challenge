import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";
import geoApi from "../API/geoAPI";

const GameContextProvider = ({ children }) => {
  const [speedBonus, setSpeedBonus] = useState(0);
  const [width, setWidth] = useState(100);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [rank, setRank] = useState(1);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [lives, setLives] = useState(5);
  const [finalScore, setFinalScore] = useState(0);

  const [status, setStatus] = useState({
    isActive: false,
    isLost: true,
    isWon: false,
  });

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const res = await geoApi.getData();
        setCountries(res);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getCountryData();
  }, []);

  return (
    <GameContext.Provider
      value={{
        level,
        setLevel,
        score,
        setScore,
        countries,
        setCountries,
        hasLoaded,
        status,
        setStatus,
        lives,
        setLives,
        width,
        setWidth,
        speedBonus,
        setSpeedBonus,
        rank,
        setRank,
        finalScore,
        setFinalScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
