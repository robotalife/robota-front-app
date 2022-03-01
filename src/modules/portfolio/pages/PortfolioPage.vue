<script>
import Doughnut from "./SampleChart";

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      isBalancesLoaded: false,
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
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "assetName",
        },
        { text: "Total", value: "assetTotal", sortable: true },
        { text: "Available", value: "assetAvailable", sortable: true },
        { text: "Value", value: "assetValue" },
        { text: "Last Price", value: "lastPrice" },
      ],
      balances: [],
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
        this.fetchBalances();
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
    fetchBalances() {
      const selectedExchange = this.$store.getters.selectedExchange;
      console.log(selectedExchange, "selected");
      this.$api.portfolio
        .fetchBalances(selectedExchange)
        .then((result) => {
          console.log(result);
          this.balances = result.balances;
          this.isBalancesLoaded = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
  },
};
</script>
<template>
  <div>
    <div class="d-flex flex-col w-1-1">
      <div
        v-if="isBalancesLoaded"
        class="h-1-1 d-flex flex-col ai-center jc-center"
      >
        <v-data-table
          :headers="headers"
          :items="balances"
          :items-per-page="5"
          class="elevation-1 w-1-1"
        ></v-data-table>
      </div>
      <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
        {{ errorMessage }}
        <template v-slot:action="{ attrs }">
          <v-btn
            :color="snackbarColor"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <div class="small">
      <Doughnut v-if="isLoaded" :chart-data="datacollection"></Doughnut>
      <button @click="fillData()">Randomize</button>
    </div>
  </div>
</template>
<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
