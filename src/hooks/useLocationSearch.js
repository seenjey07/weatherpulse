import { useState, useCallback } from "react";
import { weatherApi } from "../api";
import { ERROR_MESSAGES } from "../constants";

/**
 * Custom hook for location search and suggestions
 * @returns {{
 *   locations: Array,
 *   isLoading: boolean,
 *   error: string | null,
 *   searchLocations: (query: string) => Promise<void>,
 *   clearLocations: () => void
 * }}
 */
export const useLocationSearch = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocations = useCallback(async (query) => {
    if (!query || query.trim().length === 0) {
      setLocations([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await weatherApi.fetchLocations(query);

    if (response.success) {
      setLocations(response.data);
      setError(response.data.length === 0 ? ERROR_MESSAGES.NO_LOCATION_FOUND : null);
    } else {
      setError(response.error || ERROR_MESSAGES.LOCATION_FETCH_ERROR);
      setLocations([]);
    }

    setIsLoading(false);
  }, []);

  const clearLocations = useCallback(() => {
    setLocations([]);
    setError(null);
  }, []);

  return {
    locations,
    isLoading,
    error,
    searchLocations,
    clearLocations,
  };
};