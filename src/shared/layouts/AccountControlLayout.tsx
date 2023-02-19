import { Link, Outlet } from "react-router-dom";
import routes from "../consts/routes";

const AccountControlLayout = () => {
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
      AccountControlLayout
      <Outlet />
    </div>
  );
};

export default AccountControlLayout;
