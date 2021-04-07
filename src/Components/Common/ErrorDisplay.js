import React from "react";
import { SmileyXEyes } from "phosphor-react";

const ErrorDisplay = ({ message, status }) => {
  return (
    <div className="flex flex-col items-center rounded mt-5 bg-cerise-200 bg-opacity-50 p-2">
      <div className="font-bold">Oops! I did it again. </div>
      <h5>
        {status}: {message}
      </h5>
      <SmileyXEyes size={48} className="text-cerise-500" />
    </div>
  );
};

export default ErrorDisplay;
