import type { ApiError } from "../types/api.types";

// unknown : safest input type, always ApiError shape
export const normalizeError = (error: unknown): ApiError => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any; // can't infer exactly/safely, safe use any

  // NETWORK ERROR : no response means request never reached server

  if (!err?.response) {
    return {
      type: "NETWORK",
      message: "Network error. Check your connection.",
      originalError: err,
    };
  }

  const status = err.response.status;
  const data = err.response.data;

  // SERVER ERROR
  if (status >= 500) {
    return {
      type: "SERVER",
      message: "Server error. Try again later.",
      statusCode: status,
      originalError: err,
    };
  }

  // VALIDATION ERROR
  if (status === 422) {
    return {
      type: "VALIDATION",
      message: data?.message || "Validation error",
      statusCode: status,
      details: data?.errors,
      originalError: err,
    };
  }

  // CLIENT ERROR
  if (status >= 400) {
    return {
      type: "CLIENT",
      message: data?.message || "Invalid request.",
      statusCode: status,
      originalError: err,
    };
  }

  return {
    type: "UNKNOWN",
    message: "Something went wrong.",
    originalError: err,
  };
};
