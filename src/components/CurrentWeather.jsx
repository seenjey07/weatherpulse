import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Card, CardContent, CardTitle } from "./ui/card";

import clearIcon from "./assets/icons/sun.mp4";
import cloudIcon from "./assets/icons/cloudy.mp4";
import rainIcon from "./assets/icons/rain.mp4";
import snowIcon from "./assets/icons/snow.mp4";
import windyIcon from "./assets/icons/windy.mp4";
import thunderstormIcon from "./assets/icons/thunderstorm.mp4";
import mistyIcon from "./assets/icons/misty.mp4";

const CurrentWeather = ({ onSearch, onWeatherData }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [timezone, setTimezone] = useState(null);

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
      setTimezone(response.data.timezone);
      if (onWeatherData) {
        onWeatherData(response.data);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (onSearch) {
      onSearch(fetchWeather);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSearch]);

  const formatDateTime = (timestamp) => {
    const date = new Date((timestamp + timezone) * 1000);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return `${localDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })} | ${localDate
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .replace(" ", "")}`;
  };

  const capitalizeFirstLetters = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <div className="m-auto">
        <Card className="mt-2 mx-5 px-2 pt-1 font-mono bg-amber-300 place-content-center flex-1">
          {!weatherData && <Loading />}

          {weatherData && (
            <CardContent className="text-center pt-3 pb-1">
              {weatherData.weather?.[0]?.main === "Clear" ||
              weatherData.weather?.[0]?.main === "Sun" ? (
                <video
                  src={clearIcon}
                  alt="clearWeatherIcon"
                  className="weatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Clouds" ? (
                <video
                  className="weatherIcon"
                  src={cloudIcon}
                  alt="cloudyWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Mist" ||
                weatherData.weather?.[0]?.main === "Fog" ? (
                <video
                  className="weatherIcon"
                  src={mistyIcon}
                  alt="mistyWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Rain" ||
                weatherData.weather?.[0]?.main === "Drizzle" ? (
                <video
                  className="weatherIcon"
                  src={rainIcon}
                  alt="rainWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Snow" ? (
                <video
                  className="weatherIcon"
                  src={snowIcon}
                  alt="snowWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Windy" ? (
                <video
                  className="weatherIcon"
                  src={windyIcon}
                  alt="windWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : weatherData.weather?.[0]?.main === "Thunderstorm" ||
                weatherData.weather?.[0]?.main === "Storm" ? (
                <video
                  className="weatherIcon"
                  src={thunderstormIcon}
                  alt="thunderstormWeatherIcon"
                  type="video/mp4"
                  autoPlay={true}
                  loop={true}
                  muted={true}
                  controls={false}
                />
              ) : null}

              <CardTitle className="text-3xl text-amber-800">
                {Math.round(weatherData.main?.temp)}°C
              </CardTitle>
              <CardTitle className="pt-2">
                {weatherData.name}, {weatherData.sys?.country}
              </CardTitle>
              <p className="pt-3">{formatDateTime(weatherData.dt)}</p>
            </CardContent>
          )}
        </Card>
      </div>

      <div className="m-5 flex-1">
        <Card className="m-auto mt-3 font-mono bg-amber-300 py-2">
          <CardTitle className="text-lg text-amber-800 pl-2 pt-3">
            Weather Details
          </CardTitle>

          {!weatherData && (
            <p className="text-center text-gray-600 py-3">
              Retrieving weather data...
            </p>
          )}

          {weatherData && (
            <div className="m-auto py-1 px-3 font-mono flex flex-col items-center justify-center">
              <div className="flex flex-row flex-nowrap m-auto text-center py-2">
                <p className="flex flex-row flex-wrap justify-center">
                  <b className="pr-2">Condition: </b>
                  {capitalizeFirstLetters(
                    weatherData.weather?.[0]?.description
                  )}
                </p>
                <p className="px-3">
                  <b>Wind Speed:</b> {weatherData.wind?.speed}m/s
                </p>
                <p>
                  <b>Humidity:</b> {weatherData.main?.humidity}%
                </p>
              </div>
              <hr className="w-full" />
              <div className="text-center pt-2">
                <p>
                  <b>Sunrise:</b> {formatDateTime(weatherData.sys?.sunrise)}
                </p>
                <p>
                  <b>Sunset:</b> {formatDateTime(weatherData.sys?.sunset)}
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default CurrentWeather;
