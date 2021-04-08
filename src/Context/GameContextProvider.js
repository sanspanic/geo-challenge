import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";
import GeoApi from "../API/geoAPI";
import axios from "axios";
import geoApi from "../API/geoAPI";

const GameContextProvider = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
