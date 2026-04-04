import axios from "axios";
import { normalizeError } from "./errorHandler";
import { logError } from "./logger";

// =========================
// TOKEN STORAGE
// =========================

let accessToken: string | null = sessionStorage.getItem("accessToken");
let expAccessToken: string | null = sessionStorage.getItem("expAccessToken");

export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) sessionStorage.setItem("accessToken", token);
  else sessionStorage.removeItem("accessToken");
};

export const setExpAccessToken = (exp: string | null) => {
  expAccessToken = exp;
  if (exp) sessionStorage.setItem("expAccessToken", exp.toString());
  else sessionStorage.removeItem("expAccessToken");
};

// =========================
// AUTH HANDLERS
// =========================

let onAuthSuccess: (() => void) | null = null;
let onAuthFailure: (() => void) | null = null;

export const registerAuthHandlers = (
  success: () => void,
  failure: () => void,
) => {
  onAuthSuccess = success;
  onAuthFailure = failure;
};

// =========================
// AXIOS INSTANCE
// =========================

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
});

// Bare client for refresh (avoids interceptor recursion)
const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// =========================
// REFRESH STATE
// =========================

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach((p) => (token ? p.resolve(token) : p.reject(error)));
  failedQueue = [];
};

// =========================
// TOKEN REFRESH HELPER
// =========================

const TOKEN_REFRESH_BUFFER = 10 * 1000; // 10 seconds

async function refreshToken(): Promise<string> {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;
  try {
    const res = await refreshClient.post("/refresh"); // bare client
    const newToken = res.data.accessToken;
    const newExp = res.data.exp;

    setAccessToken(newToken);
    setExpAccessToken(newExp);

    processQueue(null, newToken);
    onAuthSuccess?.();

    return newToken;
  } catch (err) {
    processQueue(err, null);
    setAccessToken(null);
    setExpAccessToken(null);
    onAuthFailure?.();
    throw err;
  } finally {
    isRefreshing = false;
  }
}

// =========================
// TOKEN VALIDATION BEFORE REQUEST
// =========================

async function ensureValidToken(): Promise<void> {
  if (!accessToken || !expAccessToken) return;

  const expiresAt = Number(expAccessToken) * 1000;
  const now = Date.now();

  if (now > expiresAt - TOKEN_REFRESH_BUFFER) {
    await refreshToken();
  }
}

// =========================
// REQUEST INTERCEPTOR
// =========================

apiClient.interceptors.request.use(async (config) => {
  try {
    await ensureValidToken(); // preemptive refresh
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  } catch (err) {
    console.warn("[RequestInterceptor] Token refresh failed", err);
  }
  return config;
});

// =========================
// RESPONSE INTERCEPTOR
// =========================

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(normalizeError(error));

    // Handle 401
    if (error.response.status === 401 && !originalRequest._retry) {
      // Skip login/refresh endpoints
      if (
        originalRequest.url?.includes("/login") ||
        originalRequest.url?.includes("/refresh")
      ) {
        return Promise.reject(normalizeError(error));
      }

      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(normalizeError(refreshError));
      }
    }

    const normalized = normalizeError(error);
    logError(normalized);
    return Promise.reject(normalized);
  },
);

export default apiClient;
