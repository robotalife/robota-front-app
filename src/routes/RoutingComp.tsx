import { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import VerifyEmail from "../pages/authControl/VerifyEmail";
import NewPassword from "../pages/authControl/NewPassword";
import ForgetPassword from "../pages/authControl/ForgetPassword";
import Signin from "../pages/authControl/Signin";
import Signup from "../pages/authControl/Signup";
import Bots from "../pages/bots/Bots";
import NewBot from "../pages/bots/NewBot";
import NotFound from "../pages/NotFound";
import Portfolio from "../pages/Portfolio";
import Terms from "../pages/Terms";
import routes from "../shared/consts/routes";
import AuthControlLayout from "../shared/layouts/AuthtControlLayout";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";
import { AuthContext } from "../shared/providers/AuthProvider";
import CommonLayout from "../shared/layouts/CommonLayout";

const RoutingComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthControlLayout />}>
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.activate} element={<VerifyEmail />} />
          <Route
            path={`${routes.activate}/:userId`}
            element={<VerifyEmail />}
          />
          <Route path={routes.forgetPassword} element={<ForgetPassword />} />
          <Route
            path={`${routes.newPassword}/:key`}
            element={<NewPassword />}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path={routes.portfolio} element={<Portfolio />} />
          <Route path={routes.bots} element={<Bots />} />
          <Route path={routes.bot} element={<Bots />} />
          <Route path={routes.botsNew} element={<NewBot />} />
        </Route>
        <Route element={<CommonLayout />}>
          <Route path={routes.terms} element={<Terms />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.notFound} replace />} />
        {/* not found */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingComp;
