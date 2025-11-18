import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Wind,
  Droplets,
  Gauge,
  Eye,
  Cloud,
  Thermometer,
} from "lucide-react";

const WeatherMetrics = ({ weatherData, timezone }) => {
  if (!weatherData) return null;

  const metrics = [
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${weatherData.wind?.speed || 0} m/s`,
      description: weatherData.wind?.deg
        ? `${getWindDirection(weatherData.wind.deg)}`
        : null,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${weatherData.main?.humidity || 0}%`,
      description: getHumidityDescription(weatherData.main?.humidity),
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${weatherData.main?.pressure || 0} hPa`,
      description: getPressureDescription(weatherData.main?.pressure),
    },
    {
      icon: Eye,
      label: "Visibility",
      value: weatherData.visibility
        ? `${(weatherData.visibility / 1000).toFixed(1)} km`
        : "N/A",
    },
    {
      icon: Cloud,
      label: "Cloudiness",
      value: `${weatherData.clouds?.all || 0}%`,
    },
    {
      icon: Thermometer,
      label: "Feels Like",
      value: `${Math.round(weatherData.main?.feels_like || 0)}°C`,
      description: getFeelsLikeDescription(
        weatherData.main?.feels_like,
        weatherData.main?.temp
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={index}
            className="bg-card/60 backdrop-blur-sm border hover:border-primary/50 transition-all hover:shadow-lg"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {metric.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {metric.value}
                  </p>
                  {metric.description && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {metric.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};


const getWindDirection = (degrees) => {
  const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const getHumidityDescription = (humidity) => {
  if (humidity >= 70) return "High";
  if (humidity >= 40) return "Moderate";
  return "Low";
};

const getPressureDescription = (pressure) => {
  if (pressure >= 1013) return "High";
  if (pressure >= 1000) return "Normal";
  return "Low";
};

const getFeelsLikeDescription = (feelsLike, actual) => {
  const diff = feelsLike - actual;
  if (Math.abs(diff) < 2) return "Similar to actual";
  if (diff > 0) return "Warmer than actual";
  return "Cooler than actual";
};

export default WeatherMetrics;