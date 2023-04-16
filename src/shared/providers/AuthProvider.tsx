import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import routes from "../consts/routes";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const token = localStorage.getItem("token");

const noAuthRoutes: string[] = [
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
    } else if (noAuthRoutes.includes(window.location.href)) {
      window.location.href = routes.signin;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
