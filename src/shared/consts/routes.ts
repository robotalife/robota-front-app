const routes = {
  // Auth
  signin: "/signin",
  signup: "/signup",
  activate: "/verify-email",
  forgetPassword: "/forget-password",
  newPassword: "/forgot-password/finish",
  // Bots
  myBots: "/bots/my-bots", // my bots
  botsNew: "/bots/new", // create new bot
  botOverview: "/bots/overview", // bot overview
  botActiveTrades: "/bots/active-trades", // bot overview
  botTradesHistory: "/bots/trades-history", // bot overview
  botLog: "/bots/log", // bot overview
  botTVToken: "/bot/tokens", // trading view tokens
  // Exchange
  exchangeNew: "/exchanges/new",
  exchangeList: "/exchanges/list",
  exchangeSecurity: "/exchanges/security",
  exchangeNotifications: "/exchanges/notifications",
  exchangeEditProfile: "/exchanges/edit-profile",
  exchangeInvoices: "/exchanges/invoices",
  // Common
  portfolio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
  "404": "/404",
} as const;

export default routes;
