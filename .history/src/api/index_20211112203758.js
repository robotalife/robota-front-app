import Vue from "vue";
import authModule from "./modules/auth";

Vue.prototype.$api = {
  auth: authModule,
};
