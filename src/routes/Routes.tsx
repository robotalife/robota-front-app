import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Activate from "../pages/authControl/Activate";
import ResetFinish from "../pages/authControl/ResetFinish";
import ResetInit from "../pages/authControl/ResetInit";
import Signin from "../pages/authControl/Signin";
import Signup from "../pages/authControl/Signup";
import NotFound from "../pages/NotFound";
import Portfolio from "../pages/Portfolio";
import Terms from "../pages/Terms";
import routes from "../shared/consts/routes";
import AuthControlLayout from "../shared/layouts/AuthtControlLayout";
import { DefaultLayout } from "../shared/layouts/DefaultLayout";

const RoutingComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.account} element={<AuthControlLayout />}>
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={`${routes.activate}/:id`} element={<Activate />} />
          <Route path={routes.resetInit} element={<ResetInit />} />
          <Route path={routes.resetFinish} element={<ResetFinish />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path={routes.portfoilio} element={<Portfolio />} />
          <Route path={routes.terms} element={<Terms />} />
        </Route>
        <Route path="notfound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingComp;
