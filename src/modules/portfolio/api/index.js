import $http from "@/services/http";

const PIE_CHART_ENDPOINT = (id) => `/portfolio/pie?exchangeId=${id}`;
const BALANCES_ENDPOINT = (id) => `/portfolio/balances?exchangeId=${id}`;
const BALANCE_ENDPOINT = (id) => `/portfolio/balance?exchangeId=${id}`;
const PERCENTAGE_LIST_ENDPOINT = (id) =>
  `/portfolio/percentageList?exchangeId=${id}`;
const LINECHART_ENDPOINT = (id) => `/portfolio/overview?exchangeId=${id}`;

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
  fetchPercentageList(id) {
    return $http.get(PERCENTAGE_LIST_ENDPOINT(id));
  },
  fetchLineChartData(id) {
    return $http.get(LINECHART_ENDPOINT(id));
  },
};
