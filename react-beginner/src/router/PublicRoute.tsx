import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../src/provider/AuthProvider"; // adjust path

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const auth = useContext(AuthContext);

  // If authenticated, redirect to home page
  if (auth?.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, show the children (e.g., login page)
  return children;
}
