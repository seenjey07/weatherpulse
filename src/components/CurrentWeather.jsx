import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Loading from "./Loading";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import { getWeatherIcon, formatDateTime, capitalizeFirstLetters } from "../utils/weatherIcons";
import { AlertCircle } from "lucide-react";

const CurrentWeather = forwardRef(({ onWeatherData }, ref) => {
  const { location } = useGeolocation();
  const { weatherData, isLoading, error, fetchWeather } = useWeather();


  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather(location.lat, location.lon, null);
    }
  }, [location, fetchWeather]);


  useEffect(() => {
    if (weatherData && onWeatherData) {
      onWeatherData(weatherData);
    }
  }, [weatherData, onWeatherData]);

  useImperativeHandle(ref, () => ({
    fetchWeather: (lat, lon, city) => fetchWeather(lat, lon, city),
  }));

  const weatherIcon = weatherData?.weather?.[0]?.main
    ? getWeatherIcon(weatherData.weather[0].main)
    : null;

  const timezone = weatherData?.timezone || 0;

  return (
    <>
      {/* Main Weather Card */}
      <div className="m-auto max-w-2xl">
        <Card className="mt-2 mx-5 px-2 pt-1 bg-card/80 backdrop-blur-sm border-2 shadow-lg">
          {isLoading && <Loading />}

          {error && (
            <CardContent className="text-center pt-6 pb-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          )}

          {weatherData && !error && (
            <CardContent className="text-center pt-3 pb-1">
              {weatherIcon && (
                <video
                  src={weatherIcon}
                  alt={`${weatherData.weather[0].main} weather icon`}
                  className="weatherIcon"
                  type="video/mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
              )}

              <CardTitle className="text-4xl font-bold text-primary mt-4">
                {Math.round(weatherData.main?.temp)}°C
              </CardTitle>
              
              <CardTitle className="pt-2 text-xl text-foreground">
                {weatherData.name}, {weatherData.sys?.country}
              </CardTitle>
              
              <p className="pt-3 text-sm text-muted-foreground">
                {formatDateTime(weatherData.dt, timezone)}
              </p>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Weather Details Card */}
      {weatherData && !error && (
        <div className="m-5 max-w-2xl mx-auto">
          <Card className="m-auto mt-3 bg-card/80 backdrop-blur-sm border-2 shadow-lg py-2">
            <CardTitle className="text-lg text-primary pl-4 pt-3">
              Weather Details
            </CardTitle>

            <div className="m-auto py-1 px-3 flex flex-col items-center justify-center">
              <div className="flex flex-row flex-wrap gap-4 m-auto text-center py-2 justify-center">
                <p className="flex flex-row flex-wrap justify-center gap-1">
                  <b className="text-foreground">Condition:</b>
                  <span className="text-muted-foreground">
                    {capitalizeFirstLetters(weatherData.weather?.[0]?.description)}
                  </span>
                </p>
                <p className="flex flex-row gap-1">
                  <b className="text-foreground">Wind Speed:</b>
                  <span className="text-muted-foreground">
                    {weatherData.wind?.speed}m/s
                  </span>
                </p>
                <p className="flex flex-row gap-1">
                  <b className="text-foreground">Humidity:</b>
                  <span className="text-muted-foreground">
                    {weatherData.main?.humidity}%
                  </span>
                </p>
              </div>
              
              <hr className="w-full border-border my-2" />
              
              <div className="text-center pt-2 space-y-1">
                <p className="flex flex-row gap-2 justify-center">
                  <b className="text-foreground">Sunrise:</b>
                  <span className="text-muted-foreground">
                    {formatDateTime(weatherData.sys?.sunrise, timezone)}
                  </span>
                </p>
                <p className="flex flex-row gap-2 justify-center">
                  <b className="text-foreground">Sunset:</b>
                  <span className="text-muted-foreground">
                    {formatDateTime(weatherData.sys?.sunset, timezone)}
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
});

CurrentWeather.displayName = "CurrentWeather";

export default CurrentWeather;