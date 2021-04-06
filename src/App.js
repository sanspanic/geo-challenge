import "./App.css";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import Button from "./Components/Common/Button";
import { Link, BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes/Routes";

function App() {
  return (
    <div className="content-wrapper">
      <BrowserRouter>
        <Navbar />
        <Routes />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
