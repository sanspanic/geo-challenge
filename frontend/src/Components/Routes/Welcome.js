import React, { useContext, useEffect } from "react";
import Button from "../Common/Button";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

const Welcome = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  //make sure logged in user gets redirected to /game
  useEffect(() => {
    if (user.username) {
      history.push("/game");
    }
  }, [user.username, history]);

  return (
    <div className="flex-grow flex place-items-center place-content-center bg-earth">
      <div className="mesh rounded-xl shadow-xl p-20 flex flex-col justify-content-center align-items-center w-11/12 sm:w-6/12">
        <h1 className="font-black text-center text-4xl uppercase">Welcome</h1>
        <p className="py-5 text-center font-display">
          Play level 1 & 2 as guest, or login to access all levels and compete
          for a place on the Leaderboard.
        </p>
        <div className="text-center flex justify-center gap-3">
          <Button text="login" gradient="purple" />
          <Button text="game" gradient="green" />
        </div>

        <p className="text-sm text-gray-600 text-center pt-5">
          No account yet? 
          <Link to="/register" className="underline italic">
            Register
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Welcome;
