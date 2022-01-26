export const settingsRouter = [
  {
    path: "/settings/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/settings/pages/Profile"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Settings" */ "@/modules/settings/pages/SettingsWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/settings/security",
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/settings/pages/Security"
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
    path: "/settings/notification",
    name: "profile",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/settings/pages/Notification"
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
    path: "/settings/exchange",
    name: "exchange",
    component: () =>
      import(
        /* webpackChunkName: "Main" */ "@/modules/settings/pages/Exchange"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Settings" */ "@/modules/settings/pages/SettingsWrapper"
        ),
      requiresAuth: true,
    },
  },
];
