import React from "react";
import Button from "../Common/Button";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex-grow flex place-items-center place-content-center bg-earth">
      <div className="bg-white bg-opacity-50 rounded-xl shadow-xl p-20 flex flex-col justify-content-center align-items-center">
        <h1 className="font-black text-center text-4xl uppercase">Welcome</h1>
        <p className="py-5">
          Play level 1 as guest, or access all levels by logging in.
        </p>
        <div className="text-center flex justify-center gap-3">
          <Button text="Login" gradient="purple" />
          <Button text="Guest" gradient="green" />
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
