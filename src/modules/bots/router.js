export const botsRouter = [
  {
    path: "/bots/market",
    name: "bots",
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
];
