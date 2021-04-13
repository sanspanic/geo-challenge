import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import backendAPI from "../../API/backendAPI";
import AuthContext from "../../Context/AuthContext";
import RotatingGlobe from "../Common/RotatingGlobe";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const initialFormData = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tryRegister = async () => {
      try {
        const token = await backendAPI.register(formData);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          // save token and user to localStorage
          localStorage.setItem("token", token);
          localStorage.setItem(
            "user",
            JSON.stringify({ username: formData.username })
          );
          //save user to context
          setUser({ username: formData.username });
          //redirect to game
          history.push("/game");
        }, 4000);
        console.log(token);
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    tryRegister();
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <div className="flex-grow bg-earth flex items-center justify-center">
      <form
        className="my-10 bg-white bg-opacity-50 rounded shadow-xl p-10 mx-2 sm:mx-0 md:p-7 sm:w-8/12 lg:w-4/12"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4 text-xl font-black sm:text-center sm:mb-6 sm:text-2xl">
          Register to Access All Levels
        </h3>
        <div className="mb-1 sm:mb-2">
          <label htmlFor="username" className="inline-block mb-1 font-medium">
            Username
          </label>
          <input
            placeholder="GeoLegend"
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
              placeholder="Marco"
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
            <label htmlFor="lastName" className="inline-block mb-1 font-medium">
              Last Name
            </label>
            <input
              placeholder="Polo"
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
            placeholder="geo@legend.com"
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

        {/*         <FormErrorHandler errorMsgs={errorMsgs} /> */}

        <div className="mt-4 mb-8 sm:mb-8 text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-purple rounded
            font-bold text-white transition duration-400 hover:text-black
            transform-gpu hover:scale-110"
          >
            {" "}
            Register
          </button>
        </div>
        {error ? (
          <p className="text-red-500 text-sm">
            This username already exists. Please try again.
          </p>
        ) : null}
        {success ? (
          <p className="text-xs">
            <span className="font-bold text-cerise-500">SUCCESS!</span> You are
            being redirected... <RotatingGlobe size={20} />
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-500">
            Got an account already? 
            <Link className="text-black underline italic" to="login">
              Login
            </Link>{" "}
            instead.
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
