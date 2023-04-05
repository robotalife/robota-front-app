import { Link, useNavigate } from "react-router-dom";
import routes from "../shared/consts/routes";
import { MouseEvent, useContext } from "react";
import { AuthContext } from "../shared/providers/AuthProvider";

const NotFound = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate(routes.signin);
  };

  return (
    <>
      <h1>
        404
        <br />
        The Page Your Looking for Not Found
      </h1>
      <br />
      <button onClick={logout}>back to sign in</button>
    </>
  );
};

export default NotFound;
