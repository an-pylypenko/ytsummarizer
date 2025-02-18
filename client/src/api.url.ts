export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL?.replace(/\/+$/, "") ||
  window.location.origin;

console.info(`API_BASE_URL: ${API_BASE_URL}`);
