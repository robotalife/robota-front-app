export interface IExchangeListResponseObj {
  default: boolean;
  exchangeId: string;
  exchangeName: string;
  exchangeType: string;
}
export interface IExchange extends IExchangeListResponseObj {
  label: string;
  value: string;
}

export interface IPair {
  value: string;
  text: string;
  base: string;
  quote: string;
  symbolFilter: {
    lotSizeFilter: {
      minQty: string;
      maxQty: string;
      stepSize: string;
      maxAllowedPrecision: number;
    };
    priceFilter: {
      minPrice: string;
      maxPrice: string;
      tickSize: string;
    };
  };
}

export interface IExchangeContext {
  exchangeList: IExchange[];
  selectedExchange: string;
  setSelectedExchange: (exchange: string) => void;
  pairs: IPair[];
  loading: boolean;
}
