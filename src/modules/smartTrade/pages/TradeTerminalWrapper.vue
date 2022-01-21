<script>
export default {
  name: "Index",
};
</script>

<template>
  <div class="w-1-1">
    <div class="TradingTerminalWrapper p-x-5 p-y-7 h-1-1">
      <p class="brand-purple font-h-1 fw-700">Smart Trade</p>
      <v-card elevation="0" class="m-t-3 TradingTerminalWrapper__tabs">
        <div class="d-flex jc-between">
          <div class="d-flex">
            <RouterLink
              to="/smart-trade/trading-terminal"
              class="d-flex ai-start p-y-3"
            >
              <div class="h-1-1">
                <span class="TradingTerminalWrapper__tab font-16-24 g-2 fw-500">
                  Trading Terminal
                </span>
              </div>
            </RouterLink>
            <RouterLink
              to="/smart-trade/open-orders"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span class="TradingTerminalWrapper__tab font-16-24 g-2 fw-500">
                  Open Orders
                </span>
              </div>
            </RouterLink>
            <RouterLink
              to="/smart-trade/order-history"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span class="TradingTerminalWrapper__tab font-16-24 g-2 fw-500">
                  Order History
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </v-card>
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.TradingTerminalWrapper {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f7fa;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #bec4cb;
  }

  &::-webkit-scrollbar-track {
    border-radius: 2px;
    //-webkit-box-shadow: inset 0 0 0 1px #fff;
  }

  @include e(tabs) {
    border-bottom: 2px solid $gray-10;
    border-radius: unset;
  }
}

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .TradingTerminalWrapper__tab {
    color: $brand-purple !important;
  }
}
</style>
