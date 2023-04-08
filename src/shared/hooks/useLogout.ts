import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import routes from "../consts/routes";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate(routes.signin);
  };
  return logout;
};

export default useLogout;
