import Vue from "vue";
import authModule from "./modules/auth";
import exchangeModule from "./modules/exchange";
import smartTrade from "./modules/smartTrade";

Vue.prototype.$api = {
  auth: authModule,
  exchange: exchangeModule,
  smartTrade: smartTrade,
};
