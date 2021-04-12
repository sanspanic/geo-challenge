import React, { useState, useContext } from "react";
import PlanetImage from "../../Assets/planet.png";
import Button from "./Button";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import NavbarCollapsed from "./NavbarCollapsed";
import LogoutField from "./LogoutField";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-black border-b navbar px-4 py-5 sm:max-w-full md:max-w-full  md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link
          to="/"
          aria-label="Logo"
          title="Logo"
          className="inline-flex items-center"
        >
          <img width="40" src={PlanetImage}></img>
          <span className="text-gradient-purple ml-4 text-2xl font-bold tracking-wide text-gray-800 uppercase">
            Geo Challenge
          </span>
        </Link>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          {user.username ? (
            <>
              <li className="tracking-wide text-earthgreen-400 italic">
                Hi, {user.username}!{" "}
              </li>

              <li>
                <Link
                  to="/game"
                  aria-label="game"
                  title="game"
                  className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                >
                  Game
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  aria-label="profile"
                  title="profile"
                  className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                >
                  Profile
                </Link>
              </li>
              <LogoutField />
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                >
                  Login
                </Link>
              </li>
            </>
          )}
          <Button text="Leaderboard" gradient="purple" />
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>
          {isMenuOpen && <NavbarCollapsed setIsMenuOpen={setIsMenuOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
