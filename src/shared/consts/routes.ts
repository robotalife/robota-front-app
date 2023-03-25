const routes = {
  account: "/account",
  signin: "/account/signin",
  signup: "/account/signup",
  activate: "/account/activate",
  resetFinish: "/account/reset-activate",
  resetInit: "/account/reset-password",
  404: "/404",
  portfoilio: "/portfolio",
  terms: "/terms",
  notFound: "/not-found",
} as const;

export default routes;
