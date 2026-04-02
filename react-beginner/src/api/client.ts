// Library to make HTTP requests
import axios from "axios";
// Converts raw Axios errors into your standardized ApiError
import { normalizeError } from "./errorHandler";
// Sends errors to a logging system
import { logError } from "./logger";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Request will fail after 10 seconds. Prevent hanging request
});

// Request interceptor : Runs BEFORE hitting backend
// Without this we have to repeat everywhere
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor : Runs AFTER backend responds
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeError(error);

    logError(normalized);

    // Send this error to .catch() (or if user React Query to onError)”
    // If without reject : Goes to .then() / onSuccess
    // If no return : promise undefined
    return Promise.reject(normalized);
  },
);

export default apiClient;
