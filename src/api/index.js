import Vue from "vue";
import authModule from "../modules/auth/api";
import exchangeModule from "../modules/settings/api";
import smartTradeModule from "../modules/smartTrade/api";
import portfolio from "../modules/portfolio/api";
import dashboard from "../modules/dashboard/api";
import bots from "../modules/bots/api";

Vue.prototype.$api = {
  auth: authModule,
  exchange: exchangeModule,
  smartTrade: smartTradeModule,
  portfolio: portfolio,
  dashboard: dashboard,
  bots: bots,
};
