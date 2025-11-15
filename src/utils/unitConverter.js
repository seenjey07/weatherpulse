/**
 * Unit conversion utilities
 */

/**
 * Convert temperature from C to F
 * @param {number} celsius
 * @returns {number} - Temperature in F
 */
export const celsiusToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};

/**
 * Convert temperature from F to C
 * @param {number} fahrenheit
 * @returns {number} - Temperature in C
 */
export const fahrenheitToCelsius = (fahrenheit) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

/**
 * Format temperature based on unit
 * @param {number} celsius
 * @param {string} unit - Unit type ('celsius' or 'fahrenheit')
 * @returns {string} - Formatted temperature string
 */
export const formatTemperature = (celsius, unit = "celsius") => {
  if (unit === "fahrenheit") {
    return `${celsiusToFahrenheit(celsius)}°F`;
  }
  return `${Math.round(celsius)}°C`;
};

/**
 * Convert wind speed from m/s to km/h
 * @param {number} ms
 * @returns {number} - Wind speed in km/h
 */
export const msToKmh = (ms) => {
  return Math.round(ms * 3.6);
};

/**
 * Convert wind speed from m/s to mph
 * @param {number} ms
 * @returns {number} - Wind speed in mph
 */
export const msToMph = (ms) => {
  return Math.round(ms * 2.237);
};

/**
 * Format wind speed based on unit
 * @param {number} ms
 * @param {string} unit - Unit type ('ms', 'kmh', or 'mph')
 * @returns {string} - Formatted wind speed string
 */
export const formatWindSpeed = (ms, unit = "ms") => {
  switch (unit) {
    case "kmh":
      return `${msToKmh(ms)} km/h`;
    case "mph":
      return `${msToMph(ms)} mph`;
    default:
      return `${ms.toFixed(1)} m/s`;
  }
};