import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backendAPI from "../../API/backendAPI";
import AuthContext from "../../Context/AuthContext";
import GameContext from "../../Context/GameContext";
import RotatingGlobe from "../Common/RotatingGlobe";
import { ranks, calculateRank } from "../Game/Common/helpers";

const Profile = () => {
  const initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const { setRank, rank } = useContext(GameContext);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const [currUser, setCurrUser] = useState({});

  useEffect(() => {
    const getUser = async (username) => {
      try {
        const res = await backendAPI.getUser(username);
        setCurrUser(res);
        setFormData({
          username: res.username,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          password: "",
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser(user.username);
  }, [user]);

  useEffect(() => {
    if (currUser.highscore) {
      console.log("calculating rank");
      const currRank = calculateRank(currUser.highscore);
      console.log("currRank", currRank);
      setRank(currRank);
    }
  }, [currUser]);

  return (
    <div className="bg-earth flex-grow flex place-items-center place-content-center">
      <div className="bg-white bg-opacity-50 rounded-xl shadow-xl sm:p-10 md:p-20 my-10 p-3">
        <h1 className="font-bold text-cerise-500 text-4xl mb-10">
          Hello, {user.username}!
        </h1>
        <p>
          Your highscore is:{" "}
          <span className="font-bold">{currUser.highscore}</span>
        </p>
        <p>
          Your current rank is:{" "}
          <span className="font-bold">{ranks[0][rank].name}</span>
        </p>
        <form
          className="my-10 bg-white  rounded shadow-xl p-10 mx-2 sm:mx-0 md:p-7"
          onSubmit={handleSubmit}
        >
          <h3 className="mb-4 text-xl font-black sm:text-center sm:mb-6 sm:text-2xl">
            Update Details
          </h3>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="username" className="inline-block mb-1 font-medium">
              Username
            </label>
            <input
              placeholder={currUser.username}
              required
              type="text"
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </div>
          <div className="mb-1 sm:mb-2 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="inline-block mb-1 font-medium"
              >
                First Name
              </label>
              <input
                placeholder={currUser.firstName}
                required
                type="firstName"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="firstName"
                name="firstName"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="inline-block mb-1 font-medium"
              >
                Last Name
              </label>
              <input
                placeholder={currUser.lastName}
                required
                type="lastName"
                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                id="lastName"
                name="lastName"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
          </div>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="email" className="inline-block mb-1 font-medium">
              Email
            </label>
            <input
              placeholder={currUser.email}
              required
              type="email"
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="mb-1 sm:mb-2">
            <label htmlFor="password" className="inline-block mb-1 font-medium">
              Password
            </label>
            <input
              placeholder="***********"
              required
              type="password"
              className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <div className="mt-4 mb-8 sm:mb-8 text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-purple rounded
            font-bold text-white transition duration-400 hover:text-black
            transform-gpu hover:scale-110"
            >
              {" "}
              Update Details
            </button>
          </div>
          {success ? (
            <p className="text-xs">
              <span className="font-bold text-cerise-500">SUCCESS!</span> You
              are being redirected... <RotatingGlobe size={20} />
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-gray-500">
              Please enter your password to enact changes.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
