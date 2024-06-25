import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import { Card, CardContent, CardTitle } from "./ui/card";

import clearIcon from "./assets/icons/clear.png";
import cloudIcon from "./assets/icons/cloud.png";
import drizzleIcon from "./assets/icons/drizzle.png";
import rainIcon from "./assets/icons/rain.png";
import snowIcon from "./assets/icons/snow.png";
import windIcon from "./assets/icons/wind.png";
import humidityIcon from "./assets/icons/humidity.png";

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
    <>
      <SearchBar onSearch={handleSearch} />

      <Card className="m-auto p-2 font-mono bg-amber-300">
        {!weatherData && <Loading />}

        {weatherData && (
          <CardContent className="text-center py-3 gap-2">
            <CardTitle className="text-3xl text-amber-800">
              {weatherData.main?.temp}°C
            </CardTitle>
            {weatherData.weather?.[0]?.main.includes("clear") ? (
              <img
                src={clearIcon}
                alt="clearWeatherIcon"
                className="weatherIcon"
              />
            ) : weatherData.weather?.[0]?.main.includes("cloud") ? (
              <img src={cloudIcon} alt="cloudyWeatherIcon" />
            ) : weatherData.weather?.[0]?.main.includes("drizzle") ? (
              <img src={drizzleIcon} alt="drizzleWeatherIcon" />
            ) : weatherData.weather?.[0]?.main.includes("rain") ? (
              <img src={rainIcon} alt="rainWeatherIcon" />
            ) : weatherData.weather?.[0]?.main.includes("snow") ? (
              <img src={snowIcon} alt="snowWeatherIcon" />
            ) : weatherData.weather?.[0]?.main.includes("wind") ? (
              <img src={windIcon} alt="windWeatherIcon" />
            ) : (
              <p>Condition: {weatherData.weather?.[0]?.main}</p>
            )}
            <CardTitle className="pt-2">
              {weatherData.name}, {weatherData.sys?.country}
            </CardTitle>
            <p className="pt-3">{formatDateTime(weatherData.dt)}</p>
          </CardContent>
        )}
      </Card>

      <Card className="m-auto p-2 font-mono bg-white">
        <CardTitle className="text-xl text-amber-800">
          Weather Details
        </CardTitle>

        {weatherData && (
          <div className="m-auto p-2 font-mono">
            <img src={windIcon} alt="windIcon" className="weatherIcon" />
            <p>{weatherData.wind?.speed} m/s</p>
            <img
              src={humidityIcon}
              alt="humidityIcon"
              className="weatherIcon"
            />
            <p>{weatherData.main?.humidity}%</p>
            <p>Sunrise: {formatDateTime(weatherData.sys?.sunrise)}</p>
            <p>Sunset: {formatDateTime(weatherData.sys?.sunset)}</p>
          </div>
        )}
      </Card>
    </>
  );
};

export default CurrentWeather;
