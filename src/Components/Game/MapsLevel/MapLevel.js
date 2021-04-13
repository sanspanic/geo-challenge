import React, { useEffect, useState, useContext, useRef } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { API_KEY } from "../../../API/tomtom";
import "./Map.css";
import GameContext from "../../../Context/GameContext";
import { HeartStraight } from "phosphor-react";
import { v4 as uuid } from "uuid";
import { pickOnlyOne, evaluateMapGuess, gameWon } from "../Common/helpers";

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
  const [hasRendered, setHasRendered] = useState(false);
  const [distance, setDistance] = useState(0);
  const [correctLocation, setCorrectLocation] = useState([20, 20]);
  const [selection, setSelection] = useState([]);
  const [winner, setWinner] = useState({
    name: "",
    flag: "",
    capital: "",
    latlng: [],
  });
  //each level will have 20 turns
  const [turn, setTurn] = useState(1);
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
      //const arr = [-0.12, 51.5];
      //marker.setDraggable(true);
      marker.on("dragend", () => {
        //location.current = tt.LngLat.convert(correctLocation);
        console.log("dragged");
        //console.log("correctLocation: ", correctLocation);
        console.log("location.current: ", location.current);
        console.log(marker.getLngLat().distanceTo(location.current));
        setDistance(marker.getLngLat().distanceTo(location.current));
        console.log(marker.getLngLat());
      });
      setHasRendered(true);
    }
  }, [hasRendered]);

  useEffect(() => {
    if (gameWon(turn)) {
      console.log("YA WON");
      setStatus({ ...status, isWon: true, isActive: false });
    }

    //select correct answer
    if (hasLoaded) {
      setWinner(pickOnlyOne(countries));
    }

    //get new correctLocation
    //setCorrectLocation([17, 48]);
    //location.current = tt.LngLat.convert([17, 48]);
  }, [turn, hasLoaded]);

  useEffect(() => {
    if (winner.latlng.length > 0) {
      location.current = tt.LngLat.convert([
        winner.latlng[1],
        winner.latlng[0],
      ]);
      console.log(location.current);
    }
  }, [winner]);

  const handleSubmit = () => {
    console.log("distance in km: ", distance / 1000);
    console.log("evaluation: ", evaluateMapGuess(distance / 1000));
    setScore((s) => s + evaluateMapGuess(distance / 1000));
    setTurn((t) => t + 1);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-black">Find Capital of {winner.name} </h1>
        <div className=" border border-red-500 h-screen" id="map"></div>
        <button
          className="self-center bg-gradient-green px-4 py-2 rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110"
          onClick={handleSubmit}
        >
          Submit Choice
        </button>
      </div>

      <div className=" mx-auto w-40 my-6 border border-black rounded bg-white p-2">
        <div className="text-center">
          Score: <span className="text-xl font-bold">{score}</span>
        </div>
        <div className="text-center">
          {Array.from({ length: mistakes }).map((m) => (
            <HeartStraight
              key={uuid()}
              className="inline text-red-600 my-1"
              size={24}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
