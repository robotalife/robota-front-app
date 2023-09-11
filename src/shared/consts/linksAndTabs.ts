import routes from './routes';

export const botsPages = (badge: number | string) => {
  return [
    {
      label: 'Add new bot',
      to: routes.botsNew,
    },
    {
      label: 'My bots',
      to: routes.myBots,
      badge: badge,
    },
    {
      label: 'Trade Terminal',
      to: routes.tradeTerminal,
    },
  ];
};

export const botTabs = (botId: string | number) => {
  return [
    {
      label: 'Overview',
      to: `${routes.botOverview}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Active Trade',
      to: `${routes.botActiveTrades}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Trades History',
      to: `${routes.botTradesHistory}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Events Log',
      to: `${routes.botLog}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Trading View Tokens',
      to: `${routes.botTVToken}/${botId}`,
      pageTitle: '',
    },
  ];
};

export const storeTabs = (botId: string | number) => {
  return [
    {
      label: 'Overview',
      to: `${routes.storeBotOverview}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Active Trade',
      to: `${routes.storeBotActiveTrades}/${botId}`,
      pageTitle: '',
    },
    {
      label: 'Trades History',
      to: `${routes.storeBotTradesHistory}/${botId}`,
      pageTitle: '',
    },
  ];
};

export const exchangeTabs = [
  {
    label: 'Exchnages',
    to: routes.exchangeList,
  },
  {
    label: 'Security',
    to: routes.exchangeSecurity,
  },
  {
    label: 'Notifications',
    to: routes.exchangeNotifications,
  },
  {
    label: 'Edit Profile',
    to: routes.exchangeEditProfile,
  },
  {
    label: 'Invoices',
    to: routes.exchangeInvoices,
  },
];
