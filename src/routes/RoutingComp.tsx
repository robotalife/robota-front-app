import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Activate from "../pages/authControl/Activate";
import ResetFinish from "../pages/authControl/ResetFinish";
import ResetInit from "../pages/authControl/ResetInit";
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

const RoutingComp = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated && (
          // not logged in pages
          <Route element={<AuthControlLayout />}>
            <Route path={routes.signin} element={<Signin />} />
            <Route path={routes.signup} element={<Signup />} />
            <Route path={`${routes.activate}/:id`} element={<Activate />} />
            <Route path={routes.resetInit} element={<ResetInit />} />
            <Route
              path={`${routes.resetFinish}/:resetKey`}
              element={<ResetFinish />}
            />
          </Route>
        )}
        {/* logged in pages */}
        {isAuthenticated && (
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Portfolio />} />
            <Route path={routes.portfoilio} element={<Portfolio />} />
            <Route path={routes.terms} element={<Terms />} />
            <Route path={routes.bots} element={<Bots />} />
            <Route path={routes.bot} element={<Bots />} />
            <Route path={routes.botsNew} element={<NewBot />} />
          </Route>
        )}
        {/* not found */}
        <Route path={routes.notFound} element={<NotFound />} />
        <Route path="*" element={<Navigate to={routes.notFound} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutingComp;
