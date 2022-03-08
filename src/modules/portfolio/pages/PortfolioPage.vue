<script>
import Doughnut from "./SampleChart";
// import BaseButton from "../../../components/button/BaseButton.vue";

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
          text: "",
          align: "start",
          sortable: false,
          value: "logo",
        },
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
      balance: "N/A",
      snackbar: false,
      errorMessage: "",
      snackbarColor: "",
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
        this.fetchBalance();
      }
    },
  },
  created() {
    const exchangeListRequestStatus = this.$store.getters.exchangeListStatus;
    if (exchangeListRequestStatus === "success") {
      this.fillData();
      this.fetchBalances();
      this.fetchBalance();
    }
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
    fetchBalance() {
      const selectedExchange = this.$store.getters.selectedExchange;
      console.log(selectedExchange, "selected");
      this.$api.portfolio
        .fetchBalance(selectedExchange)
        .then((result) => {
          console.log(result);
          this.balance = result.balance;
          // this.isBalanceLoaded = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    refreshBalanceValue() {
      this.fetchBalance();
    },
  },
};
</script>
<template>
  <div>
    <div class="d-flex flex-col w-1-1">
      <div class="d-flex jc-end">
        <!-- <div @click="refreshBalanceValue">
          <BaseButton text="refresh" />
        </div> -->
        <p>${{ balance }}</p>
      </div>
      <div
        v-if="isBalancesLoaded"
        class="h-1-1 d-flex flex-col ai-center jc-center"
      >
        <v-data-table
          :headers="headers"
          :items="balances"
          :items-per-page="5"
          class="elevation-1 w-1-1"
        >
          <template v-slot:item.logo="{ item }">
            <img class="Portfolio__symbolIcon" :src="item.logo" />
          </template>
        </v-data-table>
      </div>
      <div class="small">
        <Doughnut v-if="isLoaded" :chart-data="datacollection"></Doughnut>
      </div>
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
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.Portfolio {
  @include e(symbolIcon) {
    max-width: 24px;
    max-height: 24px;
  }
}
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
