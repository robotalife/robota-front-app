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
        { text: "Value(BTC)", value: "assetValue" },
        { text: "Last Price", value: "lastPrice" },
      ],
      balances: [],
      balance: "N/A",
      snackbar: false,
      errorMessage: "",
      snackbarColor: "",
      percentageList: [],
      isPercentageListLoaded: false,
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
        this.fetchPercentageList();
        this.getUserExchanges();
      }
    },
  },
  created() {
    const exchangeListRequestStatus = this.$store.getters.exchangeListStatus;
    if (exchangeListRequestStatus === "success") {
      this.fillData();
      this.fetchBalances();
      this.fetchBalance();
      this.fetchPercentageList();
    }
  },
  methods: {
    fillData() {
      // eslint-disable-next-line prettier/prettier
      const exchangeListCurrentStatus =
        this.$store.state.exchangeListRequestStatus;
      if (exchangeListCurrentStatus === "success") {
        const exchangeId = this.$store.getters.selectedExchange;
        this.$api.dashboard.fetchPieChartData(exchangeId).then((result) => {
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
      this.$api.dashboard
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
      this.$api.dashboard
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
    fetchPercentageList() {
      const selectedExchange = this.$store.getters.selectedExchange;
      console.log(selectedExchange, "selected");
      this.$api.dashboard
        .fetchPercentageList(selectedExchange)
        .then((result) => {
          console.log(result);
          this.percentageList = result.assetPercentageValueList;
          this.isPercentageListLoaded = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    refreshBalanceValue() {
      this.fetchBalance();
    },
    getUserExchanges() {
      const exchangeList = this.$store.getters.exchangeList;
      if (!exchangeList) {
        this.$router.push({ name: "settings" });
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="Dashboard d-flex flex-col w-1-1">
      <div class="d-flex jc-end">
        <!-- <div @click="refreshBalanceValue">
          <BaseButton text="refresh" />
        </div> -->
        <p class="font-h-1 m-b-2">$ {{ balance }}</p>
      </div>
      <div class="Dashboard__pie-container d-flex w-1-1 m-b-3">
        <div class="Dashboard__pie">
          <Doughnut v-if="isLoaded" :chart-data="datacollection"></Doughnut>
        </div>
        <div
          v-if="isPercentageListLoaded"
          class="m-l-4 ai-center d-flex flex-col flex-wrap ai-start"
        >
          <div
            class="m-t-1 m-r-4 d-flex"
            v-for="(item, index) in percentageList"
            :key="index"
          >
            <img :src="item.logo" class="Portfolio__symbolIcon m-r-1" />
            <p class="Portfolio__symbol-name m-r-1">{{ item.assetName }}</p>
            <p>{{ item.percentage }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="isBalancesLoaded"
        class="h-1-1 d-flex flex-col ai-center jc-center m-t-3"
      >
        <v-data-table
          :headers="headers"
          :items="balances"
          :hide-default-footer="true"
          :disable-pagination="true"
          class="elevation-1 w-1-1"
        >
          <template v-slot:item.logo="{ item }">
            <img class="Dashboard__symbol-icon" :src="item.logo" />
          </template>
        </v-data-table>
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
.Dashboard {
  @include e(symbol-icon) {
    max-width: 24px;
    max-height: 24px;
  }

  @include e(pie-container) {
    max-height: 300px;
  }

  @include e(pie) {
    max-width: 300px;
  }

  @include e(symbol-name) {
    width: 40px;
  }
}
</style>
