import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import VerifyEmail from "../pages/accountControl/EmailVerify";
import ResetPassword from "../pages/accountControl/ResetPassword";
import Signin from "../pages/accountControl/Signin";
import Signup from "../pages/accountControl/Signup";
import NotFound from "../pages/NotFound";
import Portfolio from "../pages/Portfolio";
import routes from "../shared/consts/routes";
import AccountControlLayout from "../shared/layouts/AccountControlLayout";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

const RoutingComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.account} element={<AccountControlLayout />}>
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.verifyEmail} element={<VerifyEmail />} />
          <Route path={routes.resetPassword} element={<ResetPassword />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingComp;
