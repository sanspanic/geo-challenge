import React from "react";
import { render } from "@testing-library/react";
import SoundContextProvider from "./SoundContextProvider";

test("renders without crashing", () => {
  render(<SoundContextProvider></SoundContextProvider>);
});
