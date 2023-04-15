const routes = {
  // Auth
  signin: "/signin",
  signup: "/signup",
  activate: "/verify-email",
  forgetPassword: "/forget-password",
  newPassword: "/forgot-password/finish",
  // Bots
  bots: "/bots", // bot store
  botsNew: "/bots/new", // create new bot
  botOverview: "/bots/overview", // bot overview
  botActiveTrades: "/bots/active-trades", // bot overview
  botTradesHistory: "/bots/trades-history", // bot overview
  botLog: "/bots/log", // bot overview
  botTVToken: "/bot/tokens", // trading view tokens
  // Exchange
  exchangeNew: "/exchange/new",
  // Common
  portfolio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
  "404": "/404",
} as const;

export default routes;
