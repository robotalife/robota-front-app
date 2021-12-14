import $http from "@/services/http";

const ORDER_ENDPOINT = "/order";
const SYMBOLS_ENDPOINT = "/symbols";
const OPEN_ORDERS = (id) => `/order/open?exchangeId=${id}`;

export default {
  creatOrder(data) {
    return $http.post(ORDER_ENDPOINT, data);
  },
  fetchSymbols() {
    return $http.get(SYMBOLS_ENDPOINT);
  },
  fetchOpenOrders(id) {
    return $http.get(OPEN_ORDERS(id));
  },
};
