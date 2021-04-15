import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GameContextProvider from "../../../Context/GameContextProvider";
import SoundContextProvider from "../../../Context/SoundContextProvider";
import CapitalLevel from "./CapitalLevel";

test("renders without crashing", () => {
  render(
    <GameContextProvider>
      <SoundContextProvider>
        <CapitalLevel />
      </SoundContextProvider>
    </GameContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <GameContextProvider>
      <SoundContextProvider>
        <CapitalLevel />
      </SoundContextProvider>
    </GameContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
