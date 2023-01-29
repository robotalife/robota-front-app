<script>
export default {
  name: "TradeHistoryPage",
  components: {},
  computed: {},
  data() {
    return {
      headers: [
        {
          text: "Pair | Bot",
          value: "botName",
        },

        {
          text: "Creation Date",
          value: "creationDate",
        },
        {
          text: "Close Date",
          value: "closeDate",
        },
        {
          text: "Duration",
          value: "duration",
        },
        {
          text: "% Profit/Loss ",
          value: "profit",
        },
      ],
      trades: [],
      now: null,
    };
  },
  created() {
    this.$api.bots.getTradeHistory(this.$route.params.id).then((response) => {
      console.log(response, "tradeHistory response");
      this.trades = response;
    });
  },
  methods: {},
};
</script>
<template>
  <div class="w-1-1">
    <div class="TradeHistory h-1-1 m-t-3"></div>
    <v-card class="TradeHistory--card">
      <v-card-title>Trade History</v-card-title>
      <v-data-table
        :headers="headers"
        :items="trades"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.botName="{ item }">
          <div class="d-flex ai-center py-7">
            <img class="TradeHistory__symbol-icon" :src="item.logo" />
            <div class="ml-3">
              <p class="fw-500 font-text-sm gray-900">
                {{ item.pair }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{ item.botName }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.strategy="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3 TradeHistory__badge-strategy">
              <p
                class="fw-500 font-12-18 gray-700"
                style="mix-blend-mode: multiply"
              >
                {{ item.strategy }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.creationDate="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p class="fw-500 font-text-sm gray-900">
                {{
                  item.creationDate
                    ? new Date(item.creationDate).toDateString()
                    : ""
                }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{
                  item.creationDate
                    ? new Date(item.creationDate).toLocaleTimeString()
                    : ""
                }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.closeDate="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p class="fw-500 font-text-sm gray-900">
                {{
                  item.closeDate ? new Date(item.closeDate).toDateString() : ""
                }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{
                  item.closeDate
                    ? new Date(item.closeDate).toLocaleTimeString()
                    : ""
                }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.duration="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3 TradeHistory__badge">
              <p
                class="fw-500 font-12-18 primary-700"
                style="mix-blend-mode: multiply"
              >
                {{ item.duration }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.profit="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p
                class="fw-400 font-text-sm success-600"
                :class="
                  item.profit.indexOf('-') == -1 ? 'success-600' : 'error-600'
                "
              >
                {{ item.profit }}
              </p>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.TradeHistory {
  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    max-width: 425px;
  }

  @include e(badge) {
    background: $primary-50;
    border-radius: 16px;
    padding: 2px 8px;
  }
  @include e(badge-strategy) {
    background: $gray-100;
    border-radius: 16px;
    padding: 2px 8px;
  }

  @include e(symbol-icon) {
    max-width: 24px;
    max-height: 24px;
  }
}
</style>
