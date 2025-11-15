import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import Loading from "./Loading";
import WeatherCard from "./WeatherCard";
import WeatherMetrics from "./WeatherMetrics";
import { useWeather } from "../hooks/useWeather";
import { useGeolocation } from "../hooks/useGeolocation";
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

  const timezone = weatherData?.timezone || 0;

  return (
    <>
      {/* Main Weather Card */}
      <div className="m-auto max-w-4xl px-4 sm:px-6">
        {isLoading && (
          <div className="mt-4">
            <Loading />
          </div>
        )}

        {error && (
          <Card className="mt-4 mx-5 bg-card/80 backdrop-blur-sm border-2 shadow-lg">
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
              <Card className="bg-card/80 backdrop-blur-sm border-2 shadow-lg">
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
              <Card className="bg-card/80 backdrop-blur-sm border-2 shadow-lg">
                <CardContent className="p-4 md:p-6">
                  <CardTitle className="text-lg text-primary mb-4">
                    Sun Times
                  </CardTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-lg bg-orange-500/10">
                        <span className="text-2xl">🌅</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sunrise</p>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date((weatherData.sys?.sunrise + timezone) * 1000)
                            .toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="p-2 rounded-lg bg-orange-500/10">
                        <span className="text-2xl">🌇</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sunset</p>
                        <p className="text-sm font-semibold text-foreground">
                          {new Date((weatherData.sys?.sunset + timezone) * 1000)
                            .toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
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