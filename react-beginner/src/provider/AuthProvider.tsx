import { createContext, useEffect, useState } from "react";
import apiClient, {
  setAccessToken,
  setExpAccessToken,
  registerAuthHandlers,
} from "../api/client";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    registerAuthHandlers(
      () => setIsAuthenticated(true),
      () => setIsAuthenticated(false),
    );

    const initAuth = async () => {
      try {
        await apiClient.get("/me");

        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // FULL DEBUG INFO
        if (error.response) {
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);
        }

        if (error.request) {
          console.log("No response received:", error.request);
        }

        console.log("Message:", error.message);

        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await apiClient.post("/login", { username, password });

    setAccessToken(res.data.accessToken);
    setExpAccessToken(res.data.exp);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await apiClient.post("/logout");
    setAccessToken(null);
    setExpAccessToken(null);
    setIsAuthenticated(false);
  };

  // CRITICAL FIX: block app until auth ready
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Initializing authentication...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
