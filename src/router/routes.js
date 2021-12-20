export default [
  {
    path: "/",
    redirect: "signIn",
  },
  {
    path: "/signIn",
    name: "signIn",
    component: () =>
      import(
        /* webpackChunkName: "signIn" */ "@/modules/auth/pages/SignInPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () =>
      import(
        /* webpackChunkName: "forgetPassword" */ "@/modules/auth/pages/ForgetPasswordPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/forgot-password/finish",
    name: "forgot-password-finish",
    component: () =>
      import(
        /* webpackChunkName: "ChangePasswordPage" */ "@/modules/auth/pages/ChangePasswordPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(
        /* webpackChunkName: "signup" */ "@/modules/auth/pages/SignupPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/PublicWrapper"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/activate",
    name: "activate",
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Auth" */ "@/modules/auth/pages/ActivatePage"
        ),
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/dashboard/pages/DashboardPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Dashboard" */ "@/modules/dashboard/pages/DashboardWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    name: "settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "@/modules/settings/pages/SettingsPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Settings" */ "@/modules/settings/pages/SettingsWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/trading-terminal",
    name: "trading-terminal",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/TradeTerminalPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/TradeTerminalWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/open-orders",
    name: "open-orders",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/OpenOrdersPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/TradeTerminalWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/smart-trade/order-history",
    name: "order-history",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/smartTrade/pages/OrderHistoryPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SmartTrade" */ "@/modules/smartTrade/pages/TradeTerminalWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "*",
    redirect: "/",
  },
];
