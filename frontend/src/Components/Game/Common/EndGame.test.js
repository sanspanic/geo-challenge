import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameContextProvider from "../../../Context/GameContextProvider";
import SoundContextProvider from "../../../Context/SoundContextProvider";
import EndGame from "./EndGame";

test("renders without crashing", () => {
  render(
    <GameContextProvider>
      <SoundContextProvider>
        <MemoryRouter>
          <EndGame />
        </MemoryRouter>
      </SoundContextProvider>
    </GameContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <GameContextProvider>
      <SoundContextProvider>
        <MemoryRouter>
          <EndGame />
        </MemoryRouter>
      </SoundContextProvider>
    </GameContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
