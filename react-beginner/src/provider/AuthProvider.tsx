import { createContext, useEffect, useState } from "react";
import apiClient, {
  setAccessToken,
  setExpAccessToken,
  registerAuthHandlers,
} from "../api/client";
import { parseToken, type UserInfo } from "../utils/parseToken";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    registerAuthHandlers(
      () => {
        setIsAuthenticated(true);

        const token = sessionStorage.getItem("accessToken");

        if (token) {
          const parsed = parseToken(token);
          setUser(parsed); // ✅ UPDATE USER AFTER REFRESH
        }
      },
      () => {
        setIsAuthenticated(false);
        setUser(null); // ✅ CLEAR USER
      },
    );

    const initAuth = async () => {
      try {
        await apiClient.get("/me");
        // if browser reload, we still get userInfo
        const token = sessionStorage.getItem("accessToken");

        if (token) {
          const parsed = parseToken(token);
          setUser(parsed); // ✅ restore user
        }

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

    const parsed = parseToken(res.data.accessToken);
    setUser(parsed);

    setIsAuthenticated(true);
  };

  const logout = async () => {
    await apiClient.post("/logout");
    setAccessToken(null);
    setExpAccessToken(null);
    setUser(null);
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
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
