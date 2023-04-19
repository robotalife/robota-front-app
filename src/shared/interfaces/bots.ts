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
  pair: string;
  botName: string;
  strategy: "SHORT" | "LONG";
  creationDate: string;
  closeDate: string;
  Duration: string;
  profit: string;
  logo: string;
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
