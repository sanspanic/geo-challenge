import React from "react";
import { render } from "@testing-library/react";
import Board from "./Board";
import AuthContextProvider from "../../Context/AuthContextProvider";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <Board />
    </AuthContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <AuthContextProvider>
      <Board />
    </AuthContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
