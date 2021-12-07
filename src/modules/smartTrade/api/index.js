import $http from "@/services/http";

const ORDER_ENDPOINT = "/order";
const SYMBOLS_ENDPOINT = "/symbols";

export default {
  creatOrder(data) {
    return $http.post(ORDER_ENDPOINT, data);
  },
  fetchSymbols() {
    return $http.get(SYMBOLS_ENDPOINT);
  },
};
