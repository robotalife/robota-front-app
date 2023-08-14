import { PaginationObj } from "./paginateData";

export interface IEventLog {
  id: number;
  botId: number;
  logtype: string;
  createdAt: string;
  message: string;
}

export interface IActiveTrade {
  id: string;
  botName: string;
  creationDate: string;
  duration: string;
  logo: string;
  pair: string;
  profit: string;
  strategy: "SHORT" | "LONG";
  entryPrice: string;
  currentPrice: string;
  size: string;
}

export interface ILiveTrade {
  botId: number;
  botName: string;
  public: boolean;
  botStrategy: "SHORT" | "LONG";
  activeTradeCount: number;
  pnl: string;
  baseAssetLogo: string;
  baseAsset: string;
  qouteAsset: string;
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
  entryPrice: string;
  exitPrice: string;
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
  profitPerDayChartData: IChartData;
  winRateChartData: IChartData;
  cumulativeProfitChartData: IChartData;
  averageDailyProfit: string;
  averageWinRate: string;
}

export interface IOverviewChart {
  summaryProfitChart: IChartData;
  profitByDay: IChartData;
}

export interface IBot {
  assetLogo: string;
  chartData: IChartData | null;
  exchangeId: string;
  exchangeLogo: "https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png";
  exchangeType: string;
  id: string | number;
  isSubscribed?: boolean;
  monthlyPrice: string;
  name: string;
  pnl: string;
  stopped: false;
  strategy: "LONG" | "SHORT";
  tradingPair: string;
}

export interface IChartData {
  data: number[];
  labels: string[];
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
  reloadBots: () => void;
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
  stopped: boolean;
}

export interface IBotFilters {
  duration: number;
  exchange: string | "all";
  pair: string | null;
  profit: number[];
  page: number;
}
