import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import routes from "../consts/routes";
import useAxios from "./useAxios";

const useLogout = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const { axios } = useAxios();

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
    setIsAuthenticated(false);
    navigate(routes.signin);
  };
  return logout;
};

export default useLogout;
