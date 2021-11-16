import $http from "@/services/http";

const LOGIN_ENDPOINT = "/v2/exchange/list";
const ADD_EXCHANGE = "/v2/exchange";

export default {
  fetchExchangeList(id) {
    return $http.post(LOGIN_ENDPOINT, {
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
