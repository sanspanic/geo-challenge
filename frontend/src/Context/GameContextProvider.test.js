import React from "react";
import { render } from "@testing-library/react";
import GameContextProvider from "./GameContextProvider";

test("renders without crashing", () => {
  render(<GameContextProvider></GameContextProvider>);
});
