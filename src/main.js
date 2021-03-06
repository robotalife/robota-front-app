import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import Treemap from "highcharts/modules/treemap";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/api";
import "@/validation";
import "@/styles/app.scss";

Vue.config.productionTip = false;
Vue.use(HighchartsVue, Treemap, HighchartsVue);
Treemap(Highcharts);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
