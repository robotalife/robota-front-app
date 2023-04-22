import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import routes from "../consts/routes";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  userId: string | null;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  userId: null,
});

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
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

  useEffect(() => {
    if (token) {
      // set token as default authorization header for axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else if (!authRouts.includes(currentPage)) {
      window.location.href = `${routes.signin}?returnTo=${currentPage}`;
    }
  }, [setIsAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
