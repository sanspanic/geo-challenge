import React, { useState } from "react";
import SoundContext from "./SoundContext";
import useSound from "use-sound";
import correct from "../Assets/sounds/correct.wav";
import wrong from "../Assets/sounds/wrong.wav";
import levelup from "../Assets/sounds/levelup.wav";
import gamelost from "../Assets/sounds/gamelost.wav";
import gamewon from "../Assets/sounds/gamewon.wav";

const SoundContextProvider = ({ children }) => {
  const [playCorrect] = useSound(correct, { volume: 0.25 });
  const [playWrong] = useSound(wrong, { volume: 0.25 });
  const [playLevelUp] = useSound(levelup, { volume: 0.25 });
  const [playGameOver] = useSound(gamelost, { volume: 0.25 });
  const [playGameWon] = useSound(gamewon, { volume: 0.55 });

  return (
    <SoundContext.Provider
      value={{ playCorrect, playWrong, playLevelUp, playGameOver, playGameWon }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContextProvider;
