import $http from "@/services/http";

const PIE_CHART_ENDPOINT = (id) => `/portfolio/pie?exchangeId=${id}`;

export default {
  fetchPieChartData(id) {
    return $http.get(PIE_CHART_ENDPOINT(id));
  },
};
