import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  role?: string;
  permissions?: string[] | string;
  data_scope?: string[] | string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
};

export type UserInfo = {
  username: string;
  role: string;
  permissions: string[];
  scopes: string[];
};

export const parseToken = (token: string): UserInfo | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);

    return {
      username:
        decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
        "",
      role: decoded.role || "",
      permissions: Array.isArray(decoded.permissions)
        ? decoded.permissions
        : decoded.permissions
          ? [decoded.permissions]
          : [],
      scopes: Array.isArray(decoded.data_scope)
        ? decoded.data_scope
        : decoded.data_scope
          ? [decoded.data_scope]
          : [],
    };
  } catch {
    return null;
  }
};
