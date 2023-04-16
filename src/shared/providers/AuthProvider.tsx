import { createContext, PropsWithChildren, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

const token = localStorage.getItem("token");

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { axios } = useAxios();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      // set token as default authorization header for axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
