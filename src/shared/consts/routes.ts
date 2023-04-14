const routes = {
  // Auth
  signin: "/signin",
  signup: "/signup",
  activate: "/verify-email",
  forgetPassword: "/forget-password",
  newPassword: "/forgot-password/finish",
  // Bots
  bots: "/bots",
  bot: "/bots/:botId",
  botsNew: "/bots/new",
  botToken: "/tokens/:botId",
  // Exchange
  exchangeNew: "/exchange/new",
  // Common
  portfolio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
  "404": "/404",
} as const;

export default routes;
