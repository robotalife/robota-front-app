import $http from "@/services/http";

const ORDER_ENDPOINT = "/order";

export default {
  creatOrder(data) {
    return $http.post(ORDER_ENDPOINT, data);
  },
};
