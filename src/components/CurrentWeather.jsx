import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Loading from "./Loading";
import WeatherCard from "./WeatherCard";
import WeatherMetrics from "./WeatherMetrics";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
import { AlertCircle, Sunrise, Sunset } from "lucide-react";
import { formatTime } from "../utils/weatherIcons";

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

  const timezone = weatherData?.timezone || 0;

  return (
    <>
      {/* Main Weather Card */}
      <div className="m-auto max-w-4xl px-4 sm:px-6 z-40">
        {isLoading && (
          <div className="mt-24">
            <Loading />
          </div>
        )}

        {error && (
          <Card className="mt-4 mx-5 bg-gradient-to-br from-red-50/90 via-rose-50/90 to-pink-50/90 dark:from-red-950/90 dark:via-rose-950/90 dark:to-pink-950/90 backdrop-blur-sm border-2 border-destructive/30 shadow-lg">
            <CardContent className="text-center pt-6 pb-4">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          </Card>
        )}

        {weatherData && !error && (
          <>
            <div className="mt-4 animate-slide-in">
              <WeatherCard weatherData={weatherData} timezone={timezone} />
            </div>

            {/* Weather Metrics Grid */}
            <div className="mt-6 animate-slide-in">
              <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <CardTitle className="text-lg text-primary mb-4">
                    Weather Details
                  </CardTitle>
                  <WeatherMetrics weatherData={weatherData} timezone={timezone} />
                </CardContent>
              </Card>
            </div>

            {/* Sunrise/Sunset Card */}
            <div className="mt-6 animate-slide-in">
              <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <CardTitle className="text-lg text-primary mb-4">
                    Sunrise/Sunset
                  </CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-lg bg-yellow-400/10">
                        <span className="text-2xl text-yellow-400"><Sunrise /></span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sunrise</p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatTime(weatherData.sys?.sunrise, timezone)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-lg bg-orange-500/10">
                        <span className="text-2xl text-orange-500 "><Sunset /></span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sunset</p>
                        <p className="text-sm font-semibold text-foreground">
                          {formatTime(weatherData.sys?.sunset, timezone)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </>
  );
});

CurrentWeather.displayName = "CurrentWeather";

export default CurrentWeather;