import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";
import geoApi from "../API/geoAPI";

const GameContextProvider = ({ children }) => {
  const [width, setWidth] = useState(100);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [mistakes, setMistakes] = useState(["mistake"]);
  const [status, setStatus] = useState({
    isActive: false,
    isLost: false,
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;