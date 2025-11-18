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
 * @param {number} timestamp 
 * @param {number} timezone 
 * @returns {string} 
 */
export const formatTime = (timestamp, timezone) => {
  if (!timestamp) return "";
  

  const totalSeconds = timestamp + timezone;
  

  let hours = Math.floor((totalSeconds % 86400) / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  

  if (hours < 0) {
    hours += 24;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
    if (hours < 0) {
      hours += 24;
    }
  }
  

  hours = hours % 24;
  
  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  const displayMinutes = String(Math.abs(minutes)).padStart(2, "0");
  
  return `${displayHours}:${displayMinutes}${ampm}`;
};

/**
 * @param {number} timestamp 
 * @param {number} timezone 
 * @returns {string}
 */
export const formatDateTime = (timestamp, timezone) => {
  if (!timestamp) return "";
  

  const totalSeconds = timestamp + timezone;
  const localDate = new Date(totalSeconds * 1000);
  const year = localDate.getUTCFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = monthNames[localDate.getUTCMonth()];
  const day = localDate.getUTCDate();
  

  let hours = localDate.getUTCHours();
  let minutes = localDate.getUTCMinutes();
  

  hours = hours % 24;
  if (hours < 0) hours += 24;
  
  const ampm = hours >= 12 ? "pm" : "am";
  const displayHours = hours % 12 || 12;
  const displayMinutes = String(minutes).padStart(2, "0");
  
  return `${month} ${day}, ${year} | ${displayHours}:${displayMinutes}${ampm}`;
};

/**
 * @param {string} str 
 * @returns {string}
 */
export const capitalizeFirstLetters = (str) => {
  if (!str) return "";
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};