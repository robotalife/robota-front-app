<script>
export default {
  name: "Index",
};
</script>

<template>
  <div class="h-1-1 w-1-1">
    <div class="p-x-5 p-y-7">
      <p class="brand-purple font-h-1 fw-700">Smart Trade</p>
      <v-card
        elevation="0"
        class="Users__header m-t-3 TradingTerminalWrapper__tabs"
      >
        <div class="d-flex jc-between">
          <div class="d-flex">
            <RouterLink
              to="/smart-trade/trading-terminal"
              class="d-flex ai-start p-y-3 Users__header-item"
            >
              <!-- <VIcon class="Users__header-item-icon">$paper</VIcon> -->
              <span class="font-16-24 g-50 fw-500 Users__header-item-title">
                Trading Terminal
              </span>
            </RouterLink>
            <RouterLink
              to="/smart-trade/open-orders"
              class="d-flex ai-start p-y-3 m-l-3 Users__header-item"
            >
              <!-- <VIcon class="Users__header-item-icon">$user</VIcon> -->
              <span class="font-16-24 g-50 fw-500 Users__header-item-title">
                Open Orders
              </span>
            </RouterLink>
            <RouterLink
              to="/smart-trade/order-history"
              class="d-flex ai-start p-y-3 m-l-3 Users__header-item"
            >
              <!-- <VIcon class="Users__header-item-icon">$template</VIcon> -->
              <span class="font-16-24 g-50 fw-500 Users__header-item-title">
                Order History
              </span>
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
.Dashboard {
  background-color: #f1f2f4;
  max-height: 92vh;

  @include e(btn) {
    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  @include e(status) {
    height: 10px;
    width: 10px;
    border-radius: 10px;

    @include m(Completed) {
      background-color: $success;
    }

    @include m(Running) {
      background-color: $primary-blue-100;
    }

    @include m(Pending) {
      background-color: $warning;
    }

    @include m(Canceled) {
      background-color: $error;
    }
  }

  @include e(card) {
    border-radius: 10px;
    max-height: 188px;
    min-width: 170px;
    cursor: pointer;

    &-title {
      color: $white;
    }

    &:hover {
      border: 1px solid $primary-blue-100;
    }

    &-icon {
      transform: rotate(45deg);
    }
  }

  @include e(more) {
    width: 32px;
    height: 32px;
    padding: 4px;
  }
}

.TradingTerminalWrapper {
  @include e(tabs) {
    border-bottom: 2px solid $gray-10;
    border-radius: unset;
  }
}

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
