import { useState, useCallback } from "react";
import { weatherApi } from "../api";
import { ERROR_MESSAGES } from "../constants";

/**
 * Custom hook for weather data management
 * @returns {{
 *   weatherData: object | null,
 *   isLoading: boolean,
 *   error: string | null,
 *   fetchWeather: (lat: number | null, lon: number | null, city: string | null) => Promise<void>,
 *   clearError: () => void
 * }}
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (lat, lon, city) => {
    setIsLoading(true);
    setError(null);

    const response = await weatherApi.fetchWeather(lat, lon, city);

    if (response.success) {
      setWeatherData(response.data);
      setError(null);
    } else {
      setError(response.error || ERROR_MESSAGES.WEATHER_FETCH_ERROR);
      setWeatherData(null);
    }

    setIsLoading(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    clearError,
  };
};