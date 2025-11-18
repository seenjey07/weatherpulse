import React, { useState, useEffect, useCallback } from "react";
import { Input } from "./ui/input";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { ERROR_MESSAGES } from "../constants";
import { Loader2 } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const { locations, isLoading, error, searchLocations, clearLocations } = useLocationSearch();

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (city.trim().length > 0) {
        searchLocations(city);
      } else {
        clearLocations();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [city, searchLocations, clearLocations]);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setCity(value);
  }, []);

  const handleLocationSelect = useCallback((location) => {
    onSearch(location.name);
    setCity("");
    clearLocations();
  }, [onSearch, clearLocations]);

  const showSuggestions = locations.length > 0 && city.length >= 1;
  const showError = error && city.length > 0 && locations.length === 0;

  return (
    <div className="relative flex flex-col items-center justify-center md:items-end w-full max-w-sm">
      <div className="relative w-full">
        <div className="relative">
          <Input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Search for a city..."
            className="pl-2 mr-36 w-full h-10 bg-background/80 backdrop-blur-sm border-2 focus:border-primary transition-colors rounded-2xl"
            required
            aria-label="Search for a city"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className="absolute bg-secondary/70 rounded-xl backdrop-blur-sm left-0 right-0 mt-2 max-h-48 overflow-auto">
            <ul className="py-1">
              {locations.map((location) => (
                <li
                  key={`${location.lat}-${location.lon}`}
                  onClick={() => handleLocationSelect(location)}
                  className="px-4 py-2 hover:bg-accent cursor-pointer transition-colors text-sm"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLocationSelect(location);
                    }
                  }}
                  aria-label={`Select ${location.name}, ${location.state || ''}, ${location.country}`}
                >
                  <span className="font-medium">{location.name}</span>
                  {location.state && (
                    <span className="text-muted-foreground">, {location.state}</span>
                  )}
                  <span className="text-muted-foreground">, {location.country}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Error Message */}
        {showError && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-destructive/80 border border-destructive/40 rounded-md p-2 z-50">
            <p className="text-xs text-input text-center">
              {error || ERROR_MESSAGES.NO_LOCATION_FOUND}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;