import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export const useScope = () => {
  const context = useContext(AuthContext);
  const user = context?.user;

  const hasScope = (scope: string) => {
    return user?.scopes?.includes(scope);
  };

  return { hasScope };
};
