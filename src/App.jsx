import { useRef, useState } from "react";
import "./global.css";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const fetchWeatherRef = useRef(null);
  const [isDaytime, setIsDaytime] = useState(true);

  const handleSearch = (city) => {
    if (fetchWeatherRef.current) {
      fetchWeatherRef.current(null, null, city);
    }
  };

  const handleWeatherData = (weatherData) => {
    if (weatherData) {
      const currentTime = new Date().getTime() / 1000;
      const { sunrise, sunset } = weatherData.sys;
      setIsDaytime(currentTime >= sunrise && currentTime < sunset);
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDaytime
          ? "bg-gradient-to-br from-sky-600 to-indigo-400"
          : "bg-gradient-to-br from-gray-500 to-gray-900 "
      }`}
    >
      <Header onSearch={handleSearch} />
      <CurrentWeather
        onSearch={(func) => (fetchWeatherRef.current = func)}
        onWeatherData={handleWeatherData}
      />
      <Footer />
    </div>
  );
}

export default App;
