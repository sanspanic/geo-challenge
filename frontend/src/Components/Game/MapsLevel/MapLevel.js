import React, { useEffect, useState, useContext, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { API_KEY } from "../../../API/tomtom";
import "./Map.css";
import GameContext from "../../../Context/GameContext";
import SoundContext from "../../../Context/SoundContext";
import {
  pickOnlyOne,
  evaluateMapGuess,
  gameWon,
  nextLevel,
} from "../Common/helpers";

const Map = () => {
  const {
    score,
    mistakes,
    hasLoaded,
    countries,
    setScore,
    setStatus,
    status,
  } = useContext(GameContext);
  const { playCorrect, playWrong, playGameWon } = useContext(SoundContext);
  const [hasRendered, setHasRendered] = useState(false);
  const [distance, setDistance] = useState(1000000);
  const [winner, setWinner] = useState({
    name: "",
    flag: "",
    capital: "",
    latlng: [],
  });
  //each level will have 20 turns
  const [turn, setTurn] = useState(0);
  const location = useRef();

  useEffect(() => {
    //start marker off somewhere in Africa, center map on this point
    const initialLocation = [20, 20];
    if (!hasRendered) {
      const map = tt
        .map({
          key: API_KEY,
          container: "map",
          center: initialLocation,
        })
        .setMaxZoom(3);
      //const ll = new tt.LngLat(-73.9749, 40.7736);
      const marker = new tt.Marker({ draggable: true })
        .setLngLat(initialLocation)
        .addTo(map);
      marker.on("dragend", () => {
        setDistance(marker.getLngLat().distanceTo(location.current));
      });
      setHasRendered(true);
    }
  }, [hasRendered]);

  useEffect(() => {
    if (nextLevel(turn)) {
      setTimeout(() => {
        playGameWon();
      }, 1000);
      setStatus({ ...status, isWon: true, isActive: false });
    }
    //select correct answer
    if (hasLoaded) {
      setWinner(pickOnlyOne(countries));
      setDistance(1000000);
    }
  }, [turn, hasLoaded, countries, setStatus, status, playGameWon]);

  useEffect(() => {
    if (winner.latlng.length > 0) {
      location.current = tt.LngLat.convert([
        winner.latlng[1],
        winner.latlng[0],
      ]);
    }
  }, [winner]);

  const handleSubmit = () => {
    const result = evaluateMapGuess(distance / 1000);
    if (result > 0) {
      playCorrect();
    } else {
      playWrong();
    }
    setScore((s) => s + result);
    setTurn((t) => t + 1);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center">
        <h1 className="text-center sm:text-start text-2xl font-black py-2">
          Find: Capital of {winner.name}
        </h1>
        <div className="border mx-auto" id="map"></div>
        <button
          className="mt-5 self-center bg-gradient-green px-4 py-2 rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110"
          onClick={handleSubmit}
        >
          Submit Choice
        </button>
      </div>

      <div className="bg-gradient-pale mx-auto w-40 my-6 border-2 border-cerise-500 shadow-xl rounded p-2">
        <div className="text-center">
          Score: <span className="text-xl font-bold">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default Map;
