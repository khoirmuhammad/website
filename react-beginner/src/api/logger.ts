import type { ApiError } from "../types/api.types";

export const logError = (error: ApiError): void => {
  console.error("[API ERROR]:", error); // Outputs error to browser console
};
