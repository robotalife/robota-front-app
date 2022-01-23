export const settingsRouter = [
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
];
