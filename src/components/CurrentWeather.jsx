import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });

  const fetchWeather = async (lat, lon, city) => {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.append("appid", "95450dccd5e90daf362271ca732cee70");
    url.searchParams.append("units", "metric");

    if (city) {
      url.searchParams.append("q", city);
    } else if (lat && lon) {
      url.searchParams.append("lat", lat);
      url.searchParams.append("lon", lon);
    }

    try {
      const response = await axios.get(url.toString());
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => console.error("Geolocation error: ", error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  const handleSearch = (city) => {
    fetchWeather(null, null, city);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString("locale", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} | ${date
      .toLocaleTimeString("locale", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .replace(" ", "")}`;
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      <h3>Current Weather</h3>

      {!weatherData && <Loading />}

      {weatherData && (
        <div>
          <h3>
            {weatherData.name}, {weatherData.sys?.country}
          </h3>
          <p>{formatDateTime(weatherData.dt)}</p>
          <p>Temperature: {weatherData.main?.temp}°C</p>
          <p>Wind Speed: {weatherData.wind?.speed} m/s</p>
          <p>Humidity: {weatherData.main?.humidity}%</p>
          <p>Condition: {weatherData.weather?.[0]?.main}</p>
          <p>Sunrise: {formatDateTime(weatherData.sys?.sunrise)}</p>
          <p>Sunset: {formatDateTime(weatherData.sys?.sunset)}</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
