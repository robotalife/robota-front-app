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
import darsim from "@/assets/icons/darsim.vue";
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

Vue.use(Vuetify);
const options = {
  ltr: true,
  icons: {
    values: {
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
      darsim: {
        component: darsim,
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
    },
  },
};

export default new Vuetify(options);
