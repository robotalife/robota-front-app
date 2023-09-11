const routes = {
  // Auth
  signin: '/signin',
  signup: '/signup',
  activate: '/verify-email',
  forgetPassword: '/forget-password',
  newPassword: '/forgot-password/finish',
  // Bots
  myBots: '/bots/my-bots', // my bots
  liveTrade: '/bots/live-trade', // live trade
  tradeTerminal: '/bots/trade-terminal', // trade terminal
  botsNew: '/bots/new', // create new bot
  botOverview: '/bots/overview', // bot overview
  botActiveTrades: '/bots/active-trades', // bot overview
  botTradesHistory: '/bots/trades-history', // bot overview
  botLog: '/bots/log', // bot overview
  botTVToken: '/bot/tokens', // trading view tokens
  // Store
  store: '/store',
  storeBotOverview: '/store/overview', // bot overview
  storeBotActiveTrades: '/store/active-trades', // bot overview
  storeBotTradesHistory: '/store/trades-history', // bot overview
  // Exchange
  exchangeNew: '/exchanges/new',
  exchangeUpdate: '/exchanges/update',
  exchangeList: '/exchanges/list',
  exchangeSecurity: '/exchanges/security',
  exchangeNotifications: '/exchanges/notifications',
  exchangeEditProfile: '/exchanges/edit-profile',
  exchangeInvoices: '/exchanges/invoices',
  // Common
  portfolio: '/portfolio',
  terms: 'https://robotalife.com/term-of-use/',
  privacy: 'https://robotalife.com/privacy-notice/',
  notFound: '/not-found',
  '404': '/404',
  //social
  instagram: 'https://www.instagram.com/robotalife/',
  twitter: 'https://twitter.com/RobotaLife',
  helpcenter: 'https://robotalife.notion.site/RobotaLife-s-Help-Center-f5444fd625fd4f99b23a2f489b55704f',
} as const;

export default routes;
