import './App.css';
import Footer from './Components/Footer/Footer';
import Menu from './Components/Menu/Menu';
import Principal from './Components/Principal/Principal';
import Sobre from './Components/Sobre/Sobre';

function App() {
  return (
    <div className="App">
      <Menu />
      <Principal />
      <Sobre />
      <Footer />
    </div>
  );
}

export default App;
