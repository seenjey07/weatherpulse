import clearIcon from "../components/assets/icons/sun.mp4";
import cloudIcon from "../components/assets/icons/cloudy.mp4";
import rainIcon from "../components/assets/icons/rain.mp4";
import snowIcon from "../components/assets/icons/snow.mp4";
import windyIcon from "../components/assets/icons/windy.mp4";
import thunderstormIcon from "../components/assets/icons/thunderstorm.mp4";
import mistyIcon from "../components/assets/icons/misty.mp4";
import { WEATHER_CONDITIONS } from "../constants";

/**
 * Get weather icon video source based on weather condition
 * @param {string} condition - Weather condition
 * @returns {string|null} - Video source path or null
 */
export const getWeatherIcon = (condition) => {
  if (!condition) return null;

  const conditionUpper = condition.toUpperCase();

  if (WEATHER_CONDITIONS.CLEAR.some(c => c.toUpperCase() === conditionUpper)) {
    return clearIcon;
  }
  if (WEATHER_CONDITIONS.CLOUDS.some(c => c.toUpperCase() === conditionUpper)) {
    return cloudIcon;
  }
  if (WEATHER_CONDITIONS.MIST.some(c => c.toUpperCase() === conditionUpper)) {
    return mistyIcon;
  }
  if (WEATHER_CONDITIONS.RAIN.some(c => c.toUpperCase() === conditionUpper)) {
    return rainIcon;
  }
  if (WEATHER_CONDITIONS.SNOW.some(c => c.toUpperCase() === conditionUpper)) {
    return snowIcon;
  }
  if (WEATHER_CONDITIONS.WINDY.some(c => c.toUpperCase() === conditionUpper)) {
    return windyIcon;
  }
  if (WEATHER_CONDITIONS.THUNDERSTORM.some(c => c.toUpperCase() === conditionUpper)) {
    return thunderstormIcon;
  }

  return clearIcon; 
};

/**
 * Format date and time from timestamp
 * @param {number} timestamp - Unix timestamp
 * @param {number} timezone - Timezone offset in seconds
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (timestamp, timezone) => {
  if (!timestamp) return "";
  
  const date = new Date((timestamp + timezone) * 1000);
  const localDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );
  
  return `${localDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} | ${localDate
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()
    .replace(" ", "")}`;
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeFirstLetters = (str) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};