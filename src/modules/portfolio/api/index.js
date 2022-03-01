import $http from "@/services/http";

const PIE_CHART_ENDPOINT = (id) => `/portfolio/pie?exchangeId=${id}`;
const BALANCES_ENDPOINT = (id) => `/portfolio/balances?exchangeId=${id}`;

export default {
  fetchPieChartData(id) {
    return $http.get(PIE_CHART_ENDPOINT(id));
  },
  fetchBalances(id) {
    return $http.get(BALANCES_ENDPOINT(id));
  },
};
