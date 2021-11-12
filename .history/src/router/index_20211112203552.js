import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// import authGuard from './guard';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach(authGuard);

export default router;
