import Vue from "vue";
import authModule from "./modules/auth";
import exchangeModule from "./modules/exchange";

Vue.prototype.$api = {
  auth: authModule,
  exchange: exchangeModule,
};
