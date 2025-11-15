/**
 * API Response Types
 * Discriminated unions for type-safe API responses
 */

/**
 * @typedef {Object} ApiSuccess
 * @property {boolean} success - Always true for success responses
 * @property {T} data - The response data
 * @template T
 */

/**
 * @typedef {Object} ApiError
 * @property {boolean} success - Always false for error responses
 * @property {string} error - Error message
 * @property {unknown} [details] - Optional error details
 */

/**
 * @typedef {ApiSuccess<T> | ApiError} ApiResponse
 * @template T
 */

/**
 * Helper function to create success response
 * @template T
 * @param {T} data - The data to return
 * @returns {ApiSuccess<T>}
 */
export const createSuccessResponse = (data) => ({
  success: true,
  data,
});

/**
 * Helper function to create error response
 * @param {string} error - Error message
 * @param {unknown} [details] - Optional error details
 * @returns {ApiError}
 */
export const createErrorResponse = (error, details) => ({
  success: false,
  error,
  details,
});

/**
 * Helper function to handle API errors
 * @param {unknown} error - The error object
 * @returns {ApiError}
 */
export const handleApiError = (error) => {
  if (error && typeof error === 'object' && 'message' in error) {
    return createErrorResponse(
      error.message,
      error
    );
  }
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error;
    const message = axiosError.response?.data?.message || axiosError.message || 'An unexpected error occurred';
    return createErrorResponse(message, axiosError.response?.data);
  }
  return createErrorResponse('An unexpected error occurred', error);
};