import { useRef, useState, useCallback } from "react";
import "./global.css";
import { ErrorBoundary } from "./components/common";
import CurrentWeather from "./components/CurrentWeather";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const fetchWeatherRef = useRef(null);
  const [isDaytime, setIsDaytime] = useState(true);

  const handleSearch = useCallback((city) => {
    if (fetchWeatherRef.current) {
      fetchWeatherRef.current.fetchWeather(null, null, city);
    }
  }, []);

  const handleWeatherData = useCallback((weatherData) => {
    if (weatherData?.sys) {
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const { sunrise, sunset } = weatherData.sys;
      setIsDaytime(currentTime >= sunrise && currentTime < sunset);
    }
  }, []);

  const handleError = useCallback((error, errorInfo) => {
    console.error("Application error:", error, errorInfo);
  }, []);

  return (
    <ErrorBoundary onError={handleError}>
      <div
        className={`flex flex-col min-h-screen transition-colors duration-500 ${
          isDaytime
            ? "bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600"
            : "bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        }`}
      >
        <Header onSearch={handleSearch} />
        <main className="flex-1">
          <CurrentWeather
            ref={fetchWeatherRef}
            onWeatherData={handleWeatherData}
          />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;