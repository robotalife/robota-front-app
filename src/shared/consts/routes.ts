const routes = {
  signin: "/signin",
  signup: "/signup",
  activate: "/verify-email",
  forgetPassword: "/forget-password",
  newPassword: "/forgot-password/finish",
  "404": "/404",
  portfolio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
  bots: "/bots",
  bot: "/bots/:botId",
  botsNew: "/bots/new",
} as const;

export default routes;
