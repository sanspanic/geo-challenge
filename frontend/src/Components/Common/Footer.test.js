import React from "react";
import { render, act } from "@testing-library/react";
import Footer from "./Footer";
import GameContextProvider from "../../Context/GameContextProvider";

test("renders without crashing", () => {
  render(
    <GameContextProvider>
      <Footer />
    </GameContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <GameContextProvider>
      <Footer />
    </GameContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
