import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export const usePermission = () => {
  const context = useContext(AuthContext);
  const user = context?.user;

  const can = (permission: string) => {
    return user?.permissions?.includes(permission);
  };

  return { can };
};
