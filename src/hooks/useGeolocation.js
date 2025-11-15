import { useState, useEffect } from "react";
import { ERROR_MESSAGES } from "../constants";

/**
 * Custom hook for geolocation
 * @returns {{ location: { lat: number | null, lon: number | null }, error: string | null, loading: boolean }}
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(ERROR_MESSAGES.GEOLOCATION_ERROR);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setError(ERROR_MESSAGES.GEOLOCATION_ERROR);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { location, error, loading };
};