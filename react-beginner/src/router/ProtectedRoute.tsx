import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/auth/useAuth";

type ProtectedRouteProps = {
  children: React.ReactNode;
  permission?: string; // include permission here
};

export default function ProtectedRoute({
  children,
  permission,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth(); // get user here
  const location = useLocation();

  // WAIT until auth check finished
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Permission check
  if (permission && !user?.permissions.includes(permission)) {
    return <div>403 - Forbidden</div>;
  }

  return <>{children}</>;
}
