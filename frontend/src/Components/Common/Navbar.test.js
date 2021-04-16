import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import GameContextProvider from "../../Context/GameContextProvider";
import AuthContextProvider from "../../Context/AuthContextProvider";
import { MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <GameContextProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </GameContextProvider>
    </AuthContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <AuthContextProvider>
      <GameContextProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </GameContextProvider>
    </AuthContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
