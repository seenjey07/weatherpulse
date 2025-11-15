// API Configuration
export const API_CONFIG = {
  WEATHER_BASE_URL: "https://api.openweathermap.org/data/2.5",
  GEO_BASE_URL: "https://api.openweathermap.org/geo/1.0",
  API_KEY: process.env.REACT_APP_OPENWEATHER_API_KEY || "95450dccd5e90daf362271ca732cee70",
  UNITS: "metric",
  GEO_LIMIT: 5,
};

// API Endpoints
export const API_ENDPOINTS = {
  WEATHER: "/weather",
  GEO_DIRECT: "/direct",
};

// Weather Condition Types
export const WEATHER_CONDITIONS = {
  CLEAR: ["Clear", "Sun"],
  CLOUDS: ["Clouds"],
  MIST: ["Mist", "Fog"],
  RAIN: ["Rain", "Drizzle"],
  SNOW: ["Snow"],
  WINDY: ["Windy"],
  THUNDERSTORM: ["Thunderstorm", "Storm"],
};

// Error Messages
export const ERROR_MESSAGES = {
  GEOLOCATION_ERROR: "Unable to retrieve your location. Please search for a city.",
  WEATHER_FETCH_ERROR: "Failed to fetch weather data. Please try again.",
  LOCATION_FETCH_ERROR: "Failed to fetch location suggestions. Please try again.",
  NO_LOCATION_FOUND: "No locations found. Please try another city.",
};