import { useRef } from "react";
import "./global.css";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const fetchWeatherRef = useRef(null);

  const handleSearch = (city) => {
    if (fetchWeatherRef.current) {
      fetchWeatherRef.current(null, null, city);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-sky-600 to-indigo-300">
      <Header onSearch={handleSearch} />
      <CurrentWeather onSearch={(func) => (fetchWeatherRef.current = func)} />
      <Footer />
    </div>
  );
}

export default App;
