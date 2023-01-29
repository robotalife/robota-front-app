<script>
export default {
  name: "ActiveTradePage",
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
          text: "Strategy",
          value: "strategy",
        },
        {
          text: "Creation Date",
          value: "creationDate",
        },
        {
          text: "Duration",
          value: "duration",
        },
        {
          text: "% Unl Profit/Loss ",
          value: "profit",
        },
      ],
      trades: [],
    };
  },
  created() {
    this.$api.bots.getActiveBot(this.$route.params.id).then((response) => {
      if (response) {
        this.trades.push(response);
      }
    });
  },
  methods: {},
};
</script>
<template>
  <div class="w-1-1">
    <div class="ActiveTrade h-1-1 m-t-3"></div>
    <v-card class="ActiveTrade--card">
      <v-card-title>Active Trades</v-card-title>
      <v-data-table
        :headers="headers"
        :items="trades"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.botName="{ item }">
          <div class="d-flex ai-center py-7">
            <img class="ActiveTrade__symbol-icon" :src="item.logo" />
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
            <div class="ml-3 ActiveTrade__badge-strategy">
              <p
                class="fw-500 font-12-18 gray-700"
                style="mix-blend-mode: multiply"
              >
                {{ item.strategy }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.duration="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3 ActiveTrade__badge">
              <p
                class="fw-500 font-12-18 primary-700"
                style="mix-blend-mode: multiply"
              >
                {{ item.duration }}
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
                    : null
                }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{
                  item.creationDate
                    ? new Date(item.creationDate).toLocaleTimeString()
                    : null
                }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.profit="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p
                class="fw-400 font-text-sm success-600"
                :class="item.profit > 0 ? 'success-600' : 'error-600'"
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

.ActiveTrade {
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
