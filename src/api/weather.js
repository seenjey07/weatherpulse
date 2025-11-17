/**
 * Weather API
 * Centralized weather data operations
 */

import axios from "axios";
import { API_CONFIG, API_ENDPOINTS } from "../constants";
import { createSuccessResponse, createErrorResponse, handleApiError } from "./types";

/**
 * Fetch current weather data by coordinates or city name
 * @param {number|null} lat - Latitude
 * @param {number|null} lon - Longitude
 * @param {string|null} city - City name
 * @returns {Promise<ApiResponse>}
 */
export const fetchWeather = async (lat, lon, city) => {
  try {
    const url = new URL(`${API_CONFIG.WEATHER_BASE_URL}${API_ENDPOINTS.WEATHER}`);
    url.searchParams.append("appid", API_CONFIG.API_KEY);
    url.searchParams.append("units", API_CONFIG.UNITS);

    if (city) {
      url.searchParams.append("q", city);
    } else if (lat && lon) {
      url.searchParams.append("lat", lat);
      url.searchParams.append("lon", lon);
    } else {
      return createErrorResponse("Either city name or coordinates must be provided");
    }

    const response = await axios.get(url.toString());
    return createSuccessResponse(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return handleApiError(error);
  }
};

/**
 * Fetch location suggestions based on search query
 * @param {string} query - Search query (city name)
 * @returns {Promise<ApiResponse>}
 */
export const fetchLocations = async (query) => {
  try {
    if (!query || query.trim().length === 0) {
      return createSuccessResponse([]);
    }

    const url = new URL(`${API_CONFIG.GEO_BASE_URL}${API_ENDPOINTS.GEO_DIRECT}`);
    url.searchParams.append("appid", API_CONFIG.API_KEY);
    url.searchParams.append("limit", API_CONFIG.GEO_LIMIT.toString());
    url.searchParams.append("q", query);

    const response = await axios.get(url.toString());
    return createSuccessResponse(response.data || []);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return handleApiError(error);
  }
};