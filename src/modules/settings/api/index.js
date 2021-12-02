import $http from "@/services/http";

const EXCHANGE_LIST_ENDPOINT = "/exchange/list";
const EXCHANGE_ENDPOINT = "/exchange";

export default {
  fetchExchangeList(id) {
    return $http.post(EXCHANGE_LIST_ENDPOINT, {
      userId: id,
    });
  },
  addExchange(data) {
    return $http.post(EXCHANGE_ENDPOINT, data);
  },
  deleteExchange(id) {
    return $http.delete(EXCHANGE_ENDPOINT + "/" + id);
  },
};
