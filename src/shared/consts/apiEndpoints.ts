const apiEndPoints = {
  // Auth
  signup: '/signup',
  signin: '/user/signin',
  verifyEmail: '/user/activate?key=',
  resendVerification: '/user/resend-verification',
  resetInit: '/user/reset-password/init',
  resetFinish: '/user/reset-password/finish',
  // User
  userInfo: '/user/basic-info',
  // Exchanges
  exchange: '/exchange',
  exchangeList: '/exchange/list',
  // Symbols
  symbolsList: '/symbols?exchangeId=',
  // Store
  storeBots: '/store/bots',
  // Bots
  bots: '/bots',
  getLiveTrades: '/bots/live-trades',
  getTokens: (botId: string) => `/bots/${botId}/tokens`,
  getBot: (botId: string) => `/bots/${botId}`,
  getBotLog: (botId: string) => `/bots/${botId}/logs`,
  getBotHistory: (botId: string) => `/bots/${botId}/trades/history`,
  getBotActiveTrades: (botId: string) => `/bots/${botId}/trades/active`,
  getBotOverview: (botId: string) => `/bots/${botId}/overview?interval=`,
  getBotOverview2: (botId: string) => `/bots/${botId}/overview2?interval=`,

  getOverViewChart: (botId: string) => `/bots/${botId}/overview/chart?interval=`,
  getBotTradesFile: (botId: string) => `/export/bots/${botId}/trades`,
  getStopBot: (botId: string) => `/bots/${botId}/stop`,
  getRestartBot: (botId: string) => `/bots/${botId}/restart`,
  signal: '/signal',
  openTrade: '/trade',
  closeTrade: (tradeId: string) => `/trade/${tradeId}`,

  //Portfolio
  balance: '/portfolio/balance?exchangeId=',
};

export default apiEndPoints;
