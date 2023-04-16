const apiEndPoints = {
  // Auth
  signup: "/signup",
  signin: "/user/signin",
  verifyEmail: "/user/activate?key=",
  resendVerification: "/user/resend-verification",
  resetInit: "/user/reset-password/init",
  resetFinish: "/user/reset-password/finish",
  // User
  userInfo: "/user/basic-info",
  // Exchanges
  exchangeList: "/exchange/list",
  // Symbols
  symbolsList: "/symbols?exchangeId=",
  // Bots
  bots: "/bots",
  getTokens: (botId: string) => `/bots/${botId}/tokens`,
};

export default apiEndPoints;
