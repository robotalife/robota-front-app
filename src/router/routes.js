export default [
  {
    path: "/",
    redirect: "signIn",
    requiresAuth: false,
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () =>
      import(/* webpackChunkName: "signIn" */ "@/modules/auth/pages/SignIn"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/modules/auth/pages/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgetPassword" */ "@/modules/auth/pages/ForgetPassword"
      ),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/modules/auth/pages/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password/finish",
    name: "forgot-password-finish",
    component: () =>
      import(
        /* webpackChunkName: "forgetPasswordFinish" */ "@/modules/auth/pages/ForgetPasswordFinish"
      ),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/modules/auth/pages/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "@/modules/auth/pages/Signup"),
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/modules/auth/pages/index"),
      requiresAuth: false,
    },
  },
  {
    path: "/activate",
    name: "activate",
    meta: {
      layout: () =>
        import(/* webpackChunkName: "Auth" */ "@/modules/auth/pages/Activate"),
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/dashboard/pages/Main"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Dashboard" */ "@/modules/dashboard/pages/Index"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/modules/settings/pages/Settings"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Settings" */ "@/modules/settings/pages/Index"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/trading-terminal",
    name: "trading-terminal",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/TradeTerminal"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/Index"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/open-orders",
    name: "open-orders",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/OpenOrders"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/Index"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/order-history",
    name: "order-history",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/OrderHistory"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/Index"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];
