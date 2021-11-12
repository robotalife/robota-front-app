import $http from "@/services/http";

const LOGIN_ENDPOINT = "/v1/exchange/list";

export default {
  fetchExchangeList(id) {
    return $http.post(LOGIN_ENDPOINT, {
      userId: id,
    });
  },
};
