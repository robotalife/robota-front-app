import { Link, Outlet } from "react-router-dom";
import routes from "../consts/routes";

export const DefaultLayout = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={routes.signin}>Signin</Link>
        </li>
        <li>
          <Link to={routes.signup}>Signup</Link>
        </li>
        <li>
          <Link to={routes.resetPassword}>Reset</Link>
        </li>
        <li>
          <Link to={routes.verifyEmail}>Verify</Link>
        </li>
        <li>
          <Link to={routes.portfoilio}>portfolio</Link>
        </li>
      </ul>
      DefaultLayout
      <Outlet />
    </div>
  );
};
