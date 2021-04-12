import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";
import geoApi from "../API/geoAPI";

const GameContextProvider = ({ children }) => {
  const [speedBonus, setSpeedBonus] = useState(0);
  const [width, setWidth] = useState(100);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(101);
  const [countries, setCountries] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [mistakes, setMistakes] = useState(5);
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
    console.log("getting country data from API");
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
        mistakes,
        setMistakes,
        width,
        setWidth,
        speedBonus,
        setSpeedBonus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
