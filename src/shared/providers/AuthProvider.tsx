import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
