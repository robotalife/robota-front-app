import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import VerifyEmail from "../pages/authControl/VerifyEmail";
import NewPassword from "../pages/authControl/NewPassword";
import ForgetPassword from "../pages/authControl/ForgetPassword";
import Signin from "../pages/authControl/Signin";
import Signup from "../pages/authControl/Signup";
import Bots from "../pages/bots/Bots";
import LiveTrade from "../pages/bots/LiveTrade";
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
import TradingPanelLayout from "../shared/layouts/TradingPanelLayout";
import BotOverView from "../pages/bots/BotOverView";
import BotActiveTrade from "../pages/bots/BotActiveTrade";
import BotTradeHistory from "../pages/bots/BotTradeHistory";
import BotEventLog from "../pages/bots/BotEventLog";
import InnerTradingPanelLayout from "../shared/layouts/InnerTradingPanelLayout";
import { BotProvider } from "../shared/providers/BotProvider";
import ExchangeLayout from "../shared/layouts/ExchangesLayout";
import Exchanges from "../pages/exchanges/Exchanges";
import ExchangeSecurity from "../pages/exchanges/ExchangeSecurity";
import ExchangeNotifications from "../pages/exchanges/ExchangeNotifications";
import ExchangeEditProfile from "../pages/exchanges/ExchangeEditProfile";
import ExchangeInvoices from "../pages/exchanges/ExchangeInvoices";
import UpdateExchange from "../pages/exchanges/UpdateExchange";
import TradeTerminal from "../pages/bots/TradeTerminal";
import Store from "../pages/store/Store";
import InnerStoreLayout from "../shared/layouts/InnerStoreLayout";

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
          <Route path={routes.portfolio} element={<Portfolio />} />

          {/* Bot Store */}
          <Route path={routes.store} element={<Store />} />
          {/* Store inner bot pages */}
          <Route
            element={
              <BotProvider>
                <InnerStoreLayout />
              </BotProvider>
            }
          >
            {/* bot overview */}
            <Route
              path={`${routes.storeBotOverview}/:botId`}
              element={<BotOverView />}
            />

            {/* bot active trades */}
            <Route
              path={`${routes.storeBotActiveTrades}/:botId`}
              element={<BotActiveTrade />}
            />

            {/* bot trades history */}
            <Route
              path={`${routes.storeBotTradesHistory}/:botId`}
              element={<BotTradeHistory />}
            />
          </Route>

          {/* Bots */}

          {/* outer bot pages */}
          <Route element={<TradingPanelLayout />}>
            {/* bot store */}
            <Route path={routes.myBots} element={<Bots />} />

            {/* create new bot */}
            <Route path="/" element={<NewBot />} />
            <Route path={routes.botsNew} element={<NewBot />} />

            {/* Live Trade */}
            <Route path={routes.liveTrade} element={<LiveTrade />} />

            {/*Trade Terminal*/}
            <Route path={routes.tradeTerminal} element={<TradeTerminal />} />
          </Route>

          {/* inner bot pages with sub-layout */}
          <Route
            element={
              <BotProvider>
                <InnerTradingPanelLayout />
              </BotProvider>
            }
          >
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
          <Route element={<ExchangeLayout />}>
            <Route path={routes.exchangeNew} element={<NewExchange />} />
            <Route
              path={`${routes.exchangeUpdate}/:exchangeType/:exchnageLabel/:exchangeId`}
              element={<UpdateExchange />}
            />
            <Route path={routes.exchangeList} element={<Exchanges />} />
            <Route
              path={routes.exchangeSecurity}
              element={<ExchangeSecurity />}
            />
            <Route
              path={routes.exchangeNotifications}
              element={<ExchangeNotifications />}
            />
            <Route
              path={routes.exchangeEditProfile}
              element={<ExchangeEditProfile />}
            />
            <Route
              path={routes.exchangeInvoices}
              element={<ExchangeInvoices />}
            />
          </Route>
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
