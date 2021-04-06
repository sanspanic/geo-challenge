import React, { useState } from "react";
import { Link } from "react-router-dom";

const Button = ({ text, gradient }) => {
  return (
    <Link to={`${text.toLowerCase()}`} className="self-center">
      <button
        className={`px-4 py-2 bg-gradient-${gradient} rounded font-bold text-white transition duration-400 hover:text-black transform-gpu hover:scale-110`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
