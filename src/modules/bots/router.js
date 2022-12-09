export const botsRouter = [
  {
    path: "/bots/market",
    name: "market",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/bots/pages/BotsMarket"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Bots" */ "@/modules/bots/pages/BotsWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/mine",
    name: "mine",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/bots/pages/MyBots"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Bots" */ "@/modules/bots/pages/BotsWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/bots/pages/CreateBot"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Bots" */ "@/modules/bots/pages/BotsWrapper"
        ),
      requiresAuth: true,
    },
  },
];
