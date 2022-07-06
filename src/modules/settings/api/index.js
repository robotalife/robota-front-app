import $http from "@/services/http";

const EXCHANGE_LIST_ENDPOINT = "/exchange/list";
const EXCHANGE_ENDPOINT = "/exchange";
const BASIC_INFO_ENDPOINT = "/user/basic-info";
const EXCHANGE_UPDATE_DEFAULT_ENDPOINT = "/exchange/default";

export default {
  fetchExchangeList(id) {
    return $http.post(EXCHANGE_LIST_ENDPOINT, {
      userId: id,
    });
  },
  fetchBasicInfo() {
    return $http.get(BASIC_INFO_ENDPOINT);
  },
  updateBasicInfo(data) {
    return $http.post(BASIC_INFO_ENDPOINT, data);
  },
  addExchange(data) {
    return $http.post(EXCHANGE_ENDPOINT, data);
  },
  deleteExchange(id) {
    return $http.delete(EXCHANGE_ENDPOINT + "/" + id);
  },
  updateDefaultExchange(id) {
    return $http.post(EXCHANGE_UPDATE_DEFAULT_ENDPOINT + "/" + id);
  },
};
