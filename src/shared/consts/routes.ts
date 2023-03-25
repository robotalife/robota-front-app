const routes = {
  signin: "/account/signin",
  signup: "/account/signup",
  activate: "/account/activate",
  resetFinish: "/account/reset-activate",
  resetInit: "/account/reset-password",
  "404": "/404",
  portfoilio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
  bots: "/bots",
  bot: "/bots/:botId",
  botsNew: "/bots/new",
} as const;

export default routes;
