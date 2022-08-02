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
      showBalance: false,
      isLoading: false,
      chartOptions: {
        series: [
          {
            type: "treemap",
            data: [],
          },
        ],
        title: {
          text: "Balances Chart",
        },
      },
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
    checkSelectedExchange() {
      return this.initiateDashboard();
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      this.getUserExchanges();
      if (state === "success") {
        this.initiateDashboard();
      }
    },
    checkSelectedExchange() {
      return this.$store.getters.selectedExchange;
    },
  },
  created() {
    this.initiateDashboard();
  },
  methods: {
    fillData() {
      this.isLoading = true;
      // eslint-disable-next-line prettier/prettier
      const exchangeListCurrentStatus =
          this.$store.state.exchangeListRequestStatus;
      if (exchangeListCurrentStatus === "success") {
        const exchangeId = this.$store.getters.selectedExchange;
        this.$api.dashboard
          .fetchPieChartData(exchangeId)
          .then((result) => {
            this.datacollection.labels = result.labels;
            this.datacollection.datasets[0].data = result.data;
            this.datacollection.datasets[0].backgroundColor = result.colors;
            const dataLength = this.datacollection.datasets[0].data.length;
            const chartData = this.chartOptions.series[0].data;
            for (let i = 0; i < dataLength; i++) {
              chartData.push({
                name: this.datacollection.labels[i],
                value: Number(this.datacollection.datasets[0].data[i]),
                color: this.datacollection.datasets[0].backgroundColor[0],
              });
            }
            this.isLoaded = true;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoaded = false;
            this.isLoading = false;
          });
      }
    },
    fetchBalances() {
      const selectedExchange = this.$store.getters.selectedExchange;
      this.$api.dashboard
        .fetchBalances(selectedExchange)
        .then((result) => {
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
      this.$api.dashboard
        .fetchBalance(selectedExchange)
        .then((result) => {
          this.balance = result.balance;
          this.showBalance = true;
        })
        .catch((error) => {
          this.showBalance = false;
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    fetchPercentageList() {
      const selectedExchange = this.$store.getters.selectedExchange;
      this.$api.dashboard
        .fetchPercentageList(selectedExchange)
        .then((result) => {
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
      if (exchangeList === undefined || exchangeList.length === 0) {
        this.$router.push({ name: "exchange" });
      }
    },
    initiateDashboard() {
      const exchangeListRequestStatus = this.$store.getters.exchangeListStatus;
      if (exchangeListRequestStatus === "success") {
        this.fillData();
        this.fetchBalances();
        this.fetchBalance();
        this.fetchPercentageList();
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
        <p class="font-h-1 m-b-2" v-if="showBalance">$ {{ balance }}</p>
      </div>
      <div class="Dashboard__pie-container d-flex w-1-1 m-b-3">
        <div class="Dashboard__pie">
          <Doughnut v-if="isLoaded" :chart-data="datacollection"></Doughnut>
        </div>
        <div
          v-if="isPercentageListLoaded"
          class="m-l-4 items-center d-flex flex-col flex-wrap items-start"
        >
          <div
            class="m-t-1 m-r-4 d-flex"
            v-for="(item, index) in percentageList"
            :key="index"
          >
            <img :src="item.logo" class="Dashboard__symbol-icon m-r-1" />
            <p class="Dashboard__symbol-name m-r-1">{{ item.assetName }}</p>
            <p>{{ item.percentage }}</p>
          </div>
        </div>
      </div>
      <!--      <highcharts-->
      <!--        v-if="isLoaded"-->
      <!--        class="hc"-->
      <!--        :options="chartOptions"-->
      <!--        ref="chart"-->
      <!--      ></highcharts>-->
      <div
        v-if="isBalancesLoaded"
        class="h-1-1 d-flex flex-col items-center jc-center m-t-3"
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
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
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
