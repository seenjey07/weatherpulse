import React, { useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useForecast } from "../hooks/useForecast";
import { formatTemperature } from "../utils/unitConverter";
import { getWeatherIcon } from "../utils/weatherIcons";
import { useSettings } from "../contexts/SettingsContext";
import { Calendar, ThermometerSun, Snowflake } from "lucide-react";


const groupForecastByDay = (forecastList) => {
  if (!forecastList || !Array.isArray(forecastList)) return [];

  const grouped = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    date.setHours(0, 0, 0, 0);
    const dateKey = date.toISOString().split('T')[0];

    // Skip today, only show next 5 days
    if (date <= today) return;

    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        date,
        items: [],
        minTemp: Infinity,
        maxTemp: -Infinity,
        mainCondition: item.weather[0]?.main || 'Clear',
      };
    }

    grouped[dateKey].items.push(item);
    grouped[dateKey].minTemp = Math.min(grouped[dateKey].minTemp, item.main.temp_min);
    grouped[dateKey].maxTemp = Math.max(grouped[dateKey].maxTemp, item.main.temp_max);
  });

  // Convert to array and sort by date, take first 5
  return Object.values(grouped)
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);
};

/**
 * Format day name
 */
const formatDayName = (date) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

const Forecast = ({ location, cityName }) => {
  const { settings } = useSettings();
  const { forecastData, isLoading, error, fetchForecast } = useForecast();

  useEffect(() => {
    if (location?.lat && location?.lon) {
      fetchForecast(location.lat, location.lon, null);
    } else if (cityName) {
      fetchForecast(null, null, cityName);
    }
  }, [location, cityName, fetchForecast]);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg animate-pulse">
        <CardContent className="p-4 md:p-6">
          <div className="h-6 w-32 bg-muted rounded mb-4"></div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="min-w-[120px] bg-card/60 rounded-lg p-4 border">
                <div className="h-4 w-16 bg-muted rounded mb-2"></div>
                <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-2"></div>
                <div className="h-5 w-12 bg-muted rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !forecastData) {
    return null; // Don't show error, just don't render forecast
  }

  const dailyForecast = groupForecastByDay(forecastData.list || []);

  if (dailyForecast.length === 0) {
    return null;
  }

  const temperatureUnit = settings?.temperatureUnit || "celsius";

  return (
    <div className="mt-6 animate-slide-in">
      <Card className="bg-gradient-to-br from-cyan-50/90 via-teal-50/90 to-emerald-50/90 backdrop-blur-sm border-2 border-primary/20 shadow-lg">
        <CardContent className="p-4 md:p-6">
          <CardTitle className="text-lg text-primary mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            5-Day Forecast
          </CardTitle>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {dailyForecast.map((day, index) => {
              const weatherIcon = getWeatherIcon(day.mainCondition);
              const dayName = formatDayName(day.date);
              const dateStr = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

              return (
                <Card
                  key={index}
                  className="min-w-[140px] bg-card/60 backdrop-blur-sm border hover:border-primary/50 transition-all hover:shadow-lg flex-shrink-0"
                >
                  <CardContent className="p-4 text-center">
                    <p className="text-sm font-semibold text-foreground mb-1">{dayName}</p>
                    <p className="text-xs text-muted-foreground mb-3">{dateStr}</p>
                    
                    {weatherIcon ? (
                      <video
                        src={weatherIcon}
                        className="w-16 h-16 mx-auto mb-3"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={`${day.mainCondition} weather`}
                        role="img"
                      />
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center text-4xl">
                        {day.mainCondition === 'Clear' && '☀️'}
                        {day.mainCondition === 'Clouds' && '☁️'}
                        {day.mainCondition === 'Rain' && '🌧️'}
                        {day.mainCondition === 'Snow' && '❄️'}
                        {!['Clear', 'Clouds', 'Rain', 'Snow'].includes(day.mainCondition) && '🌤️'}
                      </div>
                    )}

                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ThermometerSun className="h-3 w-3 text-orange-500" />
                      <span className="text-sm font-semibold text-foreground">
                        {formatTemperature(day.maxTemp, temperatureUnit)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Snowflake className="h-3 w-3 text-blue-500" />
                      <span className="text-sm text-muted-foreground">
                        {formatTemperature(day.minTemp, temperatureUnit)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Forecast;