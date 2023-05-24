import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import routes from "../consts/routes";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setUserId: (value: string) => void;
  userId: string | null;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUserId: () => {},
  userId: null,
});

const token = localStorage.getItem("token");
const localUserId = localStorage.getItem("userId");
const currentPage = window.location.pathname;

const authRouts: string[] = [
  routes.signin,
  routes.signup,
  routes.activate,
  routes.forgetPassword,
  routes.newPassword,
];

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { axios } = useAxios();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(localUserId);

  useEffect(() => {
    if (token && localUserId) {
      // set token as default authorization header for axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserId(localUserId);
      setIsAuthenticated(true);
    } else if (!authRouts.includes(currentPage)) {
      window.location.href = `${routes.signin}?returnTo=${currentPage}`;
    }
  }, [setIsAuthenticated, setUserId]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userId, setUserId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
