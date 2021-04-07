import "./App.css";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import Button from "./Components/Common/Button";
import { Link, BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes/Routes";
import AuthContextProvider from "./Context/AuthContextProvider";

function App() {
  return (
    <div className="content-wrapper">
      <AuthContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes />
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
