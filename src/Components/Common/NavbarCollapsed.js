import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Planet from "../../Assets/planet.png";
import AuthContext from "../../Context/AuthContext";
import Button from "../Common/Button";
import LogoutField from "./LogoutField";

const NavbarCollapsed = ({ setIsMenuOpen }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="p-5 bg-black  rounded shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <Link
              href="/"
              aria-label="Geo Challenge"
              title="Geo Challenge"
              className="inline-flex items-center"
            >
              <img width={30} src={Planet}></img>
              <span className="ml-5 text-xl font-bold tracking-wide text-gray-800 uppercase text-gradient-purple">
                Geo Challenge
              </span>
            </Link>
          </div>
          <div>
            <button
              aria-label="Close Menu"
              title="Close Menu"
              className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                />
              </svg>
            </button>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            {user.username ? (
              <>
                <li>
                  <Link
                    href="/game"
                    aria-label="Product pricing"
                    title="Product pricing"
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
                <li>
                  <LogoutField />
                </li>
              </>
            ) : (
              <>
                <li>
                  <a
                    href="/register"
                    aria-label="Product pricing"
                    title="Product pricing"
                    className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                  >
                    Register
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    aria-label="About us"
                    title="About us"
                    className="font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
                  >
                    Login
                  </a>
                </li>
              </>
            )}

            <li>
              <Button gradient="purple" text="leaderboard" />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavbarCollapsed;
