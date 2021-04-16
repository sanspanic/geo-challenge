import React from "react";
import { render } from "@testing-library/react";
import AuthContextProvider from "./AuthContextProvider";

test("renders without crashing", () => {
  render(<AuthContextProvider></AuthContextProvider>);
});
