import React from "react";
import { Card, CardContent} from "./ui/card";
import { getWeatherIcon, formatDateTime, capitalizeFirstLetters } from "../utils/weatherIcons";
import { MapPin, Calendar, ThermometerSun, ThermometerSnow } from "lucide-react";

const WeatherCard = ({ weatherData, timezone }) => {
  if (!weatherData) return null;

  const weatherIcon = weatherData?.weather?.[0]?.main
    ? getWeatherIcon(weatherData.weather[0].main)
    : null;

  const temp = Math.round(weatherData.main?.temp || 0);
  const feelsLike = Math.round(weatherData.main?.feels_like || 0);
  const tempMin = Math.round(weatherData.main?.temp_min || 0);
  const tempMax = Math.round(weatherData.main?.temp_max || 0);
  const condition = capitalizeFirstLetters(weatherData.weather?.[0]?.description || "");

  return (
    <Card className="bg-card/90 backdrop-blur-md border-2 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        {/* Location and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <p className="font-semibold text-foreground">
                {weatherData.name}, {weatherData.sys?.country}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDateTime(weatherData.dt, timezone)}
              </p>
            </div>
          </div>
        </div>

        {/* Main Weather Display */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          {/* Weather Icon */}
          <div className="flex-shrink-0">
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
          </div>

          {/* Temperature and Condition */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2">
              <p className="text-6xl md:text-7xl font-bold text-primary leading-none">
                {temp}°
              </p>
              <p className="text-lg text-muted-foreground mt-1">
                {condition}
              </p>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
              <div className="flex items-center gap-1 text-sm">
                <ThermometerSun className="h-4 w-4 text-orange-500" />
                <span className="text-foreground font-medium">{tempMax}°</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <ThermometerSnow className="h-4 w-4 text-blue-500" />
                <span className="text-foreground font-medium">{tempMin}°</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {feelsLike}°
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;