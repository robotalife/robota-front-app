import $http from "@/services/http";

const EXCHANGE_LIST_ENDPOINT = "/exchange/list";
const ADD_EXCHANGE = "/exchange";

export default {
  fetchExchangeList(id) {
    return $http.post(EXCHANGE_LIST_ENDPOINT, {
      userId: id,
    });
  },
  addExchange(data) {
    return $http.post(ADD_EXCHANGE, data);
  },
  deleteExchange(id) {
    return $http.delete(ADD_EXCHANGE, {
      exchangeId: id,
    });
  },
};
