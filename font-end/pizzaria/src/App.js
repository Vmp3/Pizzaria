import "./App.css";
import Footer from "./Components/Footer/Footer";
import Menu from "./Components/Menu/Menu";
import Principal from "./Components/Principal/Principal";
import Sobre from "./Components/Sobre/Sobre";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutCriarConta from "./Layout/LayoutCriarConta";
import LayoutLogin from "./Layout/LayoutLogin";
import LayoutCriarPizza from "./Layout/LayoutCriarPizza";
import LayoutListarPizza from "./Layout/LayoutListarPizza";
import LayoutMontarPizza from "./Layout/LayoutMontarPizza";

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <div className="App-content">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Principal />
                  <div id="sobre">
                    <Sobre />
                  </div>
                </div>
              }
            />
            <Route
              path="/home"
              element={
                <div>
                  <Principal />
                  <div id="sobre">
                    <Sobre />
                  </div>
                </div>
              }
            />
            <Route
              path="/menu"
              element={
                <div>
                  <LayoutListarPizza />
                </div>
              }
            />
            <Route path="/criar-conta" element={<LayoutCriarConta />} />
            <Route path="/login" element={<LayoutLogin />} />
            <Route path="/criar-pizza" element={<LayoutCriarPizza />} />
            <Route path="/listar-pizza" element={<LayoutListarPizza />} />
            <Route path="/montar-pizza" element={<LayoutMontarPizza />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
