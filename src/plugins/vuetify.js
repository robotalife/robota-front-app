import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import left from "@/assets/icons/left.vue";
import file from "@/assets/icons/file.vue";
import upload from "@/assets/icons/upload.vue";
import cross from "@/assets/icons/cross.vue";
import arrowDown from "@/assets/icons/arrowDown.vue";
import download from "@/assets/icons/download.vue";
import arrowLight from "@/assets/icons/arrowLight.vue";
import load from "@/assets/icons/load.vue";
import history from "@/assets/icons/history.vue";
import saved from "@/assets/icons/saved.vue";
import add from "@/assets/icons/add.vue";
import check from "@/assets/icons/check.vue";
import close from "@/assets/icons/close.vue";
import failed from "@/assets/icons/failed.vue";
import clock from "@/assets/icons/clock.vue";
import list from "@/assets/icons/list.vue";
import paper from "@/assets/icons/paper.vue";
import user from "@/assets/icons/user.vue";
import template from "@/assets/icons/template.vue";
import logout from "@/assets/icons/logout.vue";
import admin from "@/assets/icons/admin.vue";
import remove from "@/assets/icons/remove.vue";
import lock from "@/assets/icons/lock.vue";
import robota from "@/assets/icons/robota.vue";
import dashboard from "@/assets/icons/dashboard.vue";
import smartTrade from "@/assets/icons/smartTrade.vue";
import portfolio from "@/assets/icons/portfolio.vue";
import setting from "@/assets/icons/setting.vue";
import instagram from "@/assets/icons/instagram.vue";
import telegram from "@/assets/icons/telegram.vue";
import twitter from "@/assets/icons/twitter.vue";
import robotaLogo from "@/assets/icons/robotaLogo.vue";
import trash from "@/assets/icons/trash.vue";
import alert from "@/assets/icons/alert.vue";
import bots from "@/assets/icons/bots.vue";
import refresh from "@/assets/icons/refresh.vue";
import store from "@/assets/icons/store.vue";
import exchange from "@/assets/icons/exchange.vue";
import pair from "@/assets/icons/pair.vue";
import copy from "@/assets/icons/copy.vue";

Vue.use(Vuetify);
const options = {
  ltr: true,
  icons: {
    values: {
      alert: {
        component: alert,
      },
      robota: {
        component: robota,
      },
      trash: {
        component: trash,
      },
      robotaLogo: {
        component: robotaLogo,
      },
      dashboard: {
        component: dashboard,
      },
      smartTrade: {
        component: smartTrade,
      },
      portfolio: {
        component: portfolio,
      },
      setting: {
        component: setting,
      },
      instagram: {
        component: instagram,
      },
      telegram: {
        component: telegram,
      },
      twitter: {
        component: twitter,
      },
      remove: {
        component: remove,
      },
      lock: {
        component: lock,
      },
      admin: {
        component: admin,
      },
      logout: {
        component: logout,
      },
      paper: {
        component: paper,
      },
      user: {
        component: user,
      },
      template: {
        component: template,
      },
      arrowLeft: {
        component: left,
      },
      file: {
        component: file,
      },
      upload: {
        component: upload,
      },
      cross: {
        component: cross,
      },
      arrowDown: {
        component: arrowDown,
      },
      download: {
        component: download,
      },
      arrowLight: {
        component: arrowLight,
      },
      load: {
        component: load,
      },
      history: {
        component: history,
      },
      saved: {
        component: saved,
      },
      add: {
        component: add,
      },
      failed: {
        component: failed,
      },
      close: {
        component: close,
      },
      clock: {
        component: clock,
      },
      check: {
        component: check,
      },
      list: {
        component: list,
      },
      bots: {
        component: bots,
      },
      refresh: {
        component: refresh,
      },
      store: {
        component: store,
      },
      exchange: {
        component: exchange,
      },
      pair: {
        component: pair,
      },
      copy: {
        component: copy,
      },
    },
  },
};

export default new Vuetify(options);
