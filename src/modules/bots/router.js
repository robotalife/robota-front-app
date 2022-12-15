export const botsRouter = [
  {
    path: "/bots/store",
    name: "store",
    component: () =>
      import(/* webpackChunkName: "Store" */ "@/modules/bots/pages/BotStore"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "BotDefaultWrapper" */ "@/modules/bots/pages/BotDefaultWrapper"
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
