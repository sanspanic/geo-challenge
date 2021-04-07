import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Board from "../Leaderboard/Board";
import Login from "../Auth/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route exact path="/leaderboard">
        <Board />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  );
};
export default Routes;
