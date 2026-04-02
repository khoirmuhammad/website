export type ApiErrorType =
  | "NETWORK" // Network can be treated as server error, but we may need different behavior between internet lose and server unavailable
  | "SERVER" // backend failure
  | "CLIENT" // bad request
  | "VALIDATION" // User Input // Client error for global error from client, but validation for field-level errors
  | "UNKNOWN"; // unexpected // Real errors are messy, i.e. Unexpected throw | Third-party library error | Backend sends garbage (null value)

export interface ApiError {
  type: ApiErrorType; // It can be used for behavior decisions. If network error then retry, if validation error then show validation
  message: string; // Human-readable error message. Use directly in UI
  statusCode?: number;
  details?: unknown; // Extra data from backend or mostly for validation errors
  originalError?: unknown; // The RAW error for logging, debugging
}
