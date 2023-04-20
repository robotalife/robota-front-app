export interface IEventLog {
  id: number;
  botId: number;
  logtype: string;
  createdAt: string;
  message: string;
}

export interface IActiveTrade {
  botName: string;
  creationDate: string;
  duration: string;
  logo: string;
  pair: string;
  profit: string;
  strategy: "SHORT" | "LONG";
}

export interface IBotHistoryObj {
  baseLogo: string | null;
  baseVolume: string | null;
  botName: string;
  closeDate: string;
  creationDate: string;
  duration: string;
  exchange: string | null;
  exchangeType: string | null;
  netProfit: string | null;
  pair: string;
  profitPercentage: string;
  quoteLogo: string;
  quoteVolume: string | null;
  status: string | null;
  strategy: "SHORT" | "LONG";
}

export interface INewBotInterface {
  name: string;
  exchangeId: string;
  access: "PUBLIC" | "PRIVATE";
  marginType: "CROSSED" | "ISOLATED";
  leverageValue: number;
  maxAmountForBotUsage: number;
  minAmountForBotUsage: number;
  monthlyPrice: number;
  orderStrategy: "SHORT" | "LONG";
  pair: string;
  yearlyPrice: number;
}

export interface ITradingViewTokens {
  startCommand: string;
  stopCommand: string;
}

export interface IBotOverview {
  botId: string | number;
  closedDeals: number;
  totalProfit: string;
  winRate: string;
}
