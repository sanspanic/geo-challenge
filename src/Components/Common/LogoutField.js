import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";

const LogoutField = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const handleLogout = () => {
    console.log("logging out");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser({});
    history.push("/");
  };
  return (
    <li
      onClick={handleLogout}
      className="cursor-pointer font-medium tracking-wide text-earthblue-400 transition-colors duration-200 hover:text-earthgreen-400"
    >
      Logout
    </li>
  );
};

export default LogoutField;
