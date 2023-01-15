<script>
export default {
  components: {},
  computed: {},
  created() {
    console.log("created has been called on SingleBot");
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<template>
  <div class="d-flex m-t-3">
    <v-card class="SingleBotPage__card p-3 m-r-2" outlined>
      <div class="d-flex">
        <p class="gray-900 font-16-24 fw-500">Total Profit</p>
      </div>
      <div class="d-flex m-t-3">
        <div class="d-flex flex-col">
          <p class="success-500 font-36-44 fw-600">+ 18.5%</p>
          <p class="fw-500 font-text-sm gray-500 m-t-2">
            <span class="success-500">2</span> Avg. Daily Profit
          </p>
        </div>
      </div>
    </v-card>
    <v-card class="SingleBotPage__card p-3 m-r-2" outlined>
      <div class="d-flex flex-col">
        <div class="d-flex">
          <p class="gray-900 font-16-24 fw-500">Winrate</p>
        </div>
        <div class="d-flex m-t-3">
          <div class="d-flex flex-col">
            <p class="success-500 font-36-44 fw-600">+ 45%</p>
            <p class="fw-500 font-text-sm gray-500 m-t-2">
              <span class="success-500">0.8</span> Avg. Daily Winrate
            </p>
          </div>
        </div>
      </div>
    </v-card>
    <v-card class="SingleBotPage__card p-3 m-r-2" outlined>
      <div class="d-flex flex-col">
        <div class="d-flex">
          <p class="gray-900 font-16-24 fw-500">Closed Deals</p>
        </div>
        <div class="d-flex m-t-3">
          <div class="d-flex flex-col">
            <p class="font-36-44 fw-600">196</p>
            <p class="fw-500 font-text-sm gray-500 m-t-2">6 Active Trades</p>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.SingleBotPage {
  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    width: 575.33px;
    height: 176px;
  }
}
</style>
