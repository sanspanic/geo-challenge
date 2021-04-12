import React from "react";
import { Switch, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Board from "../Leaderboard/Board";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import GameWrapper from "../Game/Common/GameWrapper";
import Profile from "../Auth/Profile";

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
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/game">
        <GameWrapper />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </Switch>
  );
};
export default Routes;
