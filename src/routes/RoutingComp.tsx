import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import CommonLayout from "../shared/layouts/CommonLayout";
import NewExchange from "../pages/exchanges/NewExchange";
import TVTokens from "../pages/bots/TVTokens";
import SettingsLayout from "../shared/layouts/SettingsLayout";
import BotOverView from "../pages/bots/BotOverView";
import BotActiveTrade from "../pages/bots/BotActiveTrade";
import BotTradeHistory from "../pages/bots/BotTradeHistory";
import BotEventLog from "../pages/bots/BotEventLog";
import InnerSettingsLayout from "../shared/layouts/InnerSettingsLayout";

const RoutingComp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<AuthControlLayout />}>
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.activate} element={<VerifyEmail />} />
          <Route path={`${routes.activate}/:id`} element={<VerifyEmail />} />
          <Route path={routes.forgetPassword} element={<ForgetPassword />} />
          <Route
            path={`${routes.newPassword}/:key`}
            element={<NewPassword />}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Portfolio />} />
          <Route path={routes.portfolio} element={<Portfolio />} />

          {/* Bots */}

          {/* outer bot pages */}
          <Route element={<SettingsLayout />}>
            {/* bot store */}
            <Route path={routes.myBots} element={<Bots />} />

            {/* create new bot */}
            <Route path={routes.botsNew} element={<NewBot />} />
          </Route>
          {/* inner bot pages with sub-layout */}
          <Route element={<InnerSettingsLayout />}>
            {/* bot overview */}
            <Route
              path={`${routes.botOverview}/:botId`}
              element={<BotOverView />}
            />

            {/* bot active trades */}
            <Route
              path={`${routes.botActiveTrades}/:botId`}
              element={<BotActiveTrade />}
            />

            {/* bot trades history */}
            <Route
              path={`${routes.botTradesHistory}/:botId`}
              element={<BotTradeHistory />}
            />

            {/* bot log */}
            <Route path={`${routes.botLog}/:botId`} element={<BotEventLog />} />

            {/* bot trading view tokens */}
            <Route
              path={`${routes.botTVToken}/:botId`}
              element={<TVTokens />}
            />
          </Route>
          {/* Exchanges */}
          <Route path={routes.exchangeNew} element={<NewExchange />} />
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
