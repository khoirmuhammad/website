import { useAuth } from "../../hooks/auth/useAuth";

type CanProps = {
  permission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode; // optional (for disable case)
};

export const PermissionComponent = ({
  permission,
  children,
  fallback = null,
}: CanProps) => {
  const { user } = useAuth();

  if (!permission) return <>{children}</>;

  const hasPermission = user?.permissions.includes(permission);

  // Show fallback (default = null → show nothing) when user doesn't have permission
  if (!hasPermission) return <>{fallback}</>;

  return <>{children}</>;
};
