import React from "react";
import { render } from "@testing-library/react";
import Welcome from "./Welcome";
import AuthContextProvider from "../../Context/AuthContextProvider";
import { MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
  render(
    <AuthContextProvider>
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    </AuthContextProvider>
  );
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <AuthContextProvider>
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    </AuthContextProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
