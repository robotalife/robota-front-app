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
      import(/* webpackChunkName: "MyBots" */ "@/modules/bots/pages/MyBots"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "AddNewBotWrapper" */ "@/modules/bots/pages/AddNewBotWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/mine",
    name: "mine",
    component: () =>
      import(/* webpackChunkName: "MineBots" */ "@/modules/bots/pages/MyBots"),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "BotDefaultWrapper" */ "@/modules/bots/pages/BotDefaultWrapper"
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
  {
    path: "/bots/:id/overview",
    name: "Overview" /* used in page title */,
    component: () =>
      import(
        /* webpackChunkName: "SingleBot" */ "@/modules/bots/pages/SingleBotPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SingleBotWrapper" */ "@/modules/bots/pages/SingleBotWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/:id/logs",
    name: "Event Log" /* used in page title */,
    component: () =>
      import(
        /* webpackChunkName: "SingleBot" */ "@/modules/bots/pages/BotLogsPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SingleBotWrapper" */ "@/modules/bots/pages/SingleBotWrapper"
        ),
      requiresAuth: true,
    },
  },
  {
    path: "/bots/:id/tokens",
    name: "TV Tokens" /* used in page title */,
    component: () =>
      import(
        /* webpackChunkName: "SingleBot" */ "@/modules/bots/pages/BotTokensPage"
      ),
    meta: {
      layout: () =>
        import(
          /* webpackChunkName: "SingleBotWrapper" */ "@/modules/bots/pages/SingleBotWrapper"
        ),
      requiresAuth: true,
    },
  },
];
