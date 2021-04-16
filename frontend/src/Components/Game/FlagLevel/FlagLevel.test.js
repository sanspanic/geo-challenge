import React from "react";
import { render } from "@testing-library/react";
import GameContextProvider from "../../../Context/GameContextProvider";
import SoundContextProvider from "../../../Context/SoundContextProvider";
import FlagLevel from "./FlagLevel";

test("renders without crashing", () => {
  render(
    <GameContextProvider>
      <SoundContextProvider>
        <FlagLevel />
      </SoundContextProvider>
    </GameContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <GameContextProvider>
      <SoundContextProvider>
        <FlagLevel />
      </SoundContextProvider>
    </GameContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
