export const smartTradeRouter = [
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
];
