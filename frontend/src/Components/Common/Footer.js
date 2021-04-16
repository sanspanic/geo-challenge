import React, { useContext } from "react";
import {
  TwitterLogo,
  GithubLogo,
  PencilLine,
  LinkedinLogo,
} from "phosphor-react";
import GameContext from "../../Context/GameContext";

const Footer = () => {
  const { status } = useContext(GameContext);
  let isHidden = null;
  if (status.isActive) isHidden = "hidden";
  return (
    <>
      <footer
        className={`${isHidden} footer mt-6 text-gray-700 border-t body-font`}
      >
        <div className="bg-black">
          <div className="container flex flex-col flex-wrap px-5 py-6 mx-auto lg:px-20 sm:flex-row">
            <span className="inline-flex justify-center mt-2 sm:mt-0 sm:justify-start">
              <a
                href="https://twitter.com/sansPanicDev"
                className="ml-4 text-white hover:text-cerise-500 transition ease-in-out duration-500"
              >
                <TwitterLogo size={24} />
              </a>
              <a
                href="https://github.com/sanspanic"
                className="ml-4 text-white hover:text-cerise-500 transition ease-in-out duration-500"
              >
                <GithubLogo size={24} />
              </a>
              <a
                href="https://dev.to/sanspanic"
                className="ml-4 text-white hover:text-cerise-500 transition ease-in-out duration-500"
              >
                <PencilLine size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/sandra-spanikova-6738aa1b7/"
                className="ml-4 text-white hover:text-cerise-500 transition ease-in-out duration-500"
              >
                <LinkedinLogo size={24} />
              </a>
            </span>
            <span className="font-mono text-center py-2 sm:ml-auto text-xs text-gradient-purple">
              Made by sansPanic. I write code and I write about code.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
