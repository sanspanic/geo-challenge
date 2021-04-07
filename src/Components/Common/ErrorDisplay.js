import React from "react";
import { SmileyXEyes } from "phosphor-react";
import { Link } from "react-router-dom";

const ErrorDisplay = ({ message, status }) => {
  return (
    <div className="flex flex-col items-center rounded mt-5 bg-cerise-200 bg-opacity-50 p-2">
      <div className="font-bold">Oops! I did it again. </div>
      <h5>
        {status}: {message}
      </h5>
      <SmileyXEyes size={48} className="text-cerise-500" />
      {status === 401 ? (
        <p className="my-2 text-sm text-gray-700">
          You must be{" "}
          <Link className="italic underline text-black" to="login">
            logged in
          </Link>{" "}
          to view this content.
        </p>
      ) : null}
    </div>
  );
};

export default ErrorDisplay;
