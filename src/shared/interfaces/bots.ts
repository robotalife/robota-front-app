import { PaginationObj } from "./paginateData";

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
  baseLogo: string;
  baseVolume: string;
  botName: string;
  closeDate: string;
  creationDate: string;
  duration: string;
  exchange: string;
  exchangeType: string;
  netProfit: string;
  pair: string;
  profitPercentage: string;
  quoteLogo: string;
  quoteVolume: string;
  status: string;
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

export interface IBot {
  assetLogo: string;
  baseAsset: string;
  createdAt: string;
  exchangeId: string;
  exchangeType: string;
  id: string | number;
  isPublic: boolean;
  leverageValue: number;
  marginType: "CROSSED" | "ISOLATED";
  maximumOrderSize: number;
  minimumOrderSize: number;
  monthlyPrice: number;
  name: String;
  orderType: "MARKET" | "LIMIT";
  qouteAsset: String;
  removed: boolean;
  strategy: "LONG" | "SHORT";
  tradingPair: string;
  yearlyPrice: number;
  exchangeLogo: string;
  stopped: boolean;
}

export interface IMyBots {
  currentPage: number;
  data: IBot[];
  nextPage: number | null;
  perPage: number;
  remainingCount: number;
  total: number;
  totalPages: number;
}

export interface IMyBotsContext {
  botsList: IBot[];
  paginateData: PaginationObj;
  loading: boolean;
  filters: IBotFilters;
  setFilters: (filters: IBotFilters) => void;
}

export interface ISingleBotData {
  createdAt: string;
  createdBy: string;
  exchangeType: string;
  id: string;
  name: string;
  owner: string | null;
  pair: string;
  price: string;
  strategy: "SHORT" | "LONG";
  stopped: string;
}

export interface IBotFilters {
  duration: number;
  exchange: string | "all";
  pair: string | null;
  profit: number[];
  page: number;
}
