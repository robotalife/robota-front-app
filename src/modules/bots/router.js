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
    path: "/bots/admin/mine",
    name: "adminBots",
    component: () =>
      import(/* webpackChunkName: "Main" */ "@/modules/bots/pages/MyBots"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "Bots" */ "@/modules/bots/pages/AddNewBotWrapper"
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
          /* webpackChunkName: "Bots" */ "@/modules/bots/pages/BotDefaultWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/create",
    name: "create",
    component: () =>
      import(
        /* webpackChunkName: "CreateBot" */ "@/modules/bots/pages/CreateBot"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "AddNewBotWrapper" */ "@/modules/bots/pages/AddNewBotWrapper"
        ),
      requiresAuth: true,
    },
  },
];
