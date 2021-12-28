import $http from "@/services/http";

const ORDER_ENDPOINT = "/order";
const SYMBOLS_ENDPOINT = (id) => `/symbols/?exchangeId=${id}`;
const OPEN_ORDERS = (id) => `/order/open?exchangeId=${id}`;
const ORDER_HISTORY = (id) => `/order/list?exchangeId=${id}`;
const SYMBOL_DETAILS_ENDPOINT = (pair, id) =>
  `/symbols/${pair}?exchangeId=${id}`;

export default {
  creatOrder(data) {
    return $http.post(ORDER_ENDPOINT, data);
  },
  fetchSymbols(id) {
    return $http.get(SYMBOLS_ENDPOINT(id));
  },
  fetchOpenOrders(id) {
    return $http.get(OPEN_ORDERS(id));
  },
  fetchOrderHistory(id) {
    return $http.get(ORDER_HISTORY(id));
  },
  fetchSymbolDetails(pair, id) {
    return $http.get(SYMBOL_DETAILS_ENDPOINT(pair, id));
  },
};
