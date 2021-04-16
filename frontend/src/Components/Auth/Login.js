import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import backendAPI from "../../API/backendAPI";
import AuthContext from "../../Context/AuthContext";

const Login = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tryLogin = async (formData) => {
      try {
        const token = await backendAPI.login(formData);
        // save token and user to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ username: formData.username })
        );
        //save user to context
        setUser({ username: formData.username });
        setError(false);
        //redirect to game
        history.push("/game");
      } catch (err) {
        setError(true);
        console.log(err);
      }
    };
    tryLogin(formData);
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
        className="bg-white bg-opacity-50 rounded shadow-xl p-20 my-5 md:p-7 w-11/12 lg:w-4/12"
        onSubmit={handleSubmit}
      >
        <h3 className="mb-4 text-xl font-black sm:text-center sm:mb-6 sm:text-2xl text-center">
          Login to Access All Levels
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
        <div className="mb-1 sm:mb-2">
          <label htmlFor="password" className="inline-block mb-1 font-medium">
            Password
          </label>
          <input
            placeholder="********"
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
            Login
          </button>
        </div>
        {error ? (
          <p className="text-sm text-red-500">
            Incorrect username/password combination.
          </p>
        ) : null}
        <p className="text-xs sm:text-sm text-gray-500">
          No account yet?{" "}
          <Link to="register" className="underline italic text-black">
            Register
          </Link>{" "}
          instead.
        </p>
      </form>
    </div>
  );
};

export default Login;
