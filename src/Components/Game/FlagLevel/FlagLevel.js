import React, { useContext, useState, useEffect } from "react";
import GameContext from "../../../Context/GameContext";
import { makeUniqueSelection } from "../Common/helpers";

const FlagLevel = () => {
  const { countries, hasLoaded } = useContext(GameContext);
  const [selection, setSelection] = useState([
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
    { name: "", flag: "", capital: "" },
  ]);
  const [winner, setWinner] = useState();
  //each level will have 20 turns
  const [turn, setTurn] = useState(1);
  console.log(countries);

  useEffect(() => {
    const indexArr = makeUniqueSelection();
    console.log("indexArr, ", indexArr);
    let selectionArr = [];
    for (let idx of indexArr) {
      console.log("countries from within loop: ", countries);
      selectionArr.push(countries[idx]);
    }
    console.log("selectionArr", selectionArr);
    if (hasLoaded) setSelection(selectionArr);
  }, [hasLoaded, turn]);

  //1. get 4 random numbers between 0 and 249 - make sure these are unique
  //2. save selected four countries to state
  //3. pick random winner and save to state
  //4. render 4 flags

  return (
    <div className="grid grid-cols-8 gap-2 ">
      <img
        alt="flag"
        src={selection[0].flag}
        className="col-span-4 md:col-span-2 border border-black transform-gpu hover:scale-110 duration-500 cursor-pointer"
      />
      <img
        alt="flag"
        src={selection[1].flag}
        className="col-start-5 col-span-4 md:col-start-3 md:col-span-2 border border-black transform-gpu hover:scale-110 duration-500 cursor-pointer"
      />
      <img
        alt="flag"
        src={selection[2].flag}
        className="col-start-1 col-span-4 md:col-start-5 md:col-span-2 border border-black transform-gpu hover:scale-110 duration-500 cursor-pointer"
      />
      <img
        alt="flag"
        src={selection[3].flag}
        className="col-start-5 col-span-4 md:col-start-7 md:col-span-2 border border-black transform-gpu hover:scale-110 duration-500 cursor-pointer"
      />
    </div>
  );
};

export default FlagLevel;
