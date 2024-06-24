import "./App.css";
import NavBar from "./components/NavBar";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <CurrentWeather />
      <Footer />
    </div>
  );
}

export default App;
