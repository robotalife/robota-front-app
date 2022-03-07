import $http from "@/services/http";

const PIE_CHART_ENDPOINT = (id) => `/portfolio/pie?exchangeId=${id}`;
const BALANCES_ENDPOINT = (id) => `/portfolio/balances?exchangeId=${id}`;
const BALANCE_ENDPOINT = (id) => `/portfolio/balance?exchangeId=${id}`;

export default {
  fetchPieChartData(id) {
    return $http.get(PIE_CHART_ENDPOINT(id));
  },
  fetchBalances(id) {
    return $http.get(BALANCES_ENDPOINT(id));
  },
  fetchBalance(id) {
    return $http.get(BALANCE_ENDPOINT(id));
  },
};
