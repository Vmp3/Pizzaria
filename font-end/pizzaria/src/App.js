import "./App.css";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";
import Principal from "./Components/Principal/Principal";
import Sobre from "./Components/Sobre/Sobre";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutCriarConta from "./Layout/LayoutCriarConta";
import LayoutLogin from "./Layout/LayoutLogin";

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
        <Route
            path="/"
            element={
              <div>
                <Principal />
                <Sobre />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <div>
                <Principal />
                <Sobre />
              </div>
            }
          />
          <Route
            path="/sobre"
            element={
              <div>
                <Principal />
                <Sobre />
              </div>
            }
          />
          <Route
            path="/contato"
            element={
              <div>
                <Principal />
                <Sobre />
              </div>
            }
          />
          <Route path="/criar-conta" element={<LayoutCriarConta />} />
          <Route path="/login" element={<LayoutLogin />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
