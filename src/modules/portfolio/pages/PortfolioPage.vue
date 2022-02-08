<template>
  <div class="small">
    <Doughnut v-if="isLoaded" :chart-data="datacollection"></Doughnut>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import Doughnut from "./SampleChart";

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            backgroundColor: [],
            data: [],
          },
        ],
      },
      isLoaded: false,
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      if (state === "success") {
        this.fillData();
      }
    },
  },
  methods: {
    fillData() {
      const exchangeListCurrentStatus = this.$store.state
        .exchangeListRequestStatus;
      if (exchangeListCurrentStatus === "success") {
        const exchangeId = this.$store.getters.selectedExchange;
        this.$api.portfolio.fetchPieChartData(exchangeId).then((result) => {
          this.datacollection.labels = result.labels;
          this.datacollection.datasets[0].data = result.data;
          this.datacollection.datasets[0].backgroundColor = result.colors;
          this.isLoaded = true;
        });
      }
    },
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
