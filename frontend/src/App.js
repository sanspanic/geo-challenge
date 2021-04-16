import "./App.css";
import Footer from "./Components/Common/Footer";
import Navbar from "./Components/Common/Navbar";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Components/Routes/Routes";
import AuthContextProvider from "./Context/AuthContextProvider";
import GameContextProvider from "./Context/GameContextProvider";
import SoundContextProvider from "./Context/SoundContextProvider";

function App() {
  return (
    <div className="content-wrapper">
      <AuthContextProvider>
        <SoundContextProvider>
          <GameContextProvider>
            <BrowserRouter>
              <Navbar />
              <Routes />
              <Footer />
            </BrowserRouter>
          </GameContextProvider>
        </SoundContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
