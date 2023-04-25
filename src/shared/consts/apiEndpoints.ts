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
  getBot: (botId: string) => `/bots/${botId}`,
  getBotLog: (botId: string) => `/bots/${botId}/logs`,
  getBotHistory: (botId: string) => `/bots/${botId}/trades/history`,
  getBotActiveTrade: (botId: string) => `/bots/${botId}/trades/active`,
  getBotOverview: (botId: string) => `/bots/${botId}/overview`,
  getBotTradesFile: (botId: string) => `/bots/${botId}/trades/export`,
  signal: "/signal",
};

export default apiEndPoints;
