<script>
import BaseSelect from "@/components/select/BaseSelect.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import ManualTrade from "./ManualTrade.vue";
import storage from "@/utils/storage";
export default {
  name: "TradingTerminal",
  components: {
    BaseSelect,
    Tabs,
    ManualTrade,
  },
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      exchangeItems: [],
      coinMarketItems: [],
      tabsItem: [
        {
          index: 1,
          title: "Buy",
        },
        {
          index: 2,
          title: "Sell",
        },
        {
          index: 3,
          title: "Smart Trade",
        },
      ],
      tab: 0,
      userData: storage.getItem("user"),
      isExchangeListLoaded: false,
      orderType: {
        SELL: "LIMIT",
        BUY: "MARKET",
      },
      orderRequest: {
        exchangeId: "",
        orderSide: "",
        orderType: "LIMIT",
        quantity: -1,
        symbol: "",
        price: -1,
      },
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
        this.getUserExchanges();
      }
    },
  },
  created() {
    const exchangeListCurrentStatus = this.$store.state
      .exchangeListRequestStatus;
    if (exchangeListCurrentStatus === "success") {
      this.getUserExchanges();
    }
  },
  methods: {
    getUserExchanges() {
      const exchanges = this.$store.getters.exchangeListItem;
      console.log(exchanges);
      this.exchangeItems = exchanges;
      this.orderRequest.exchangeId = this.exchangeItems[0].value;
      this.orderRequest.orderSide = this.toOrderSide(this.tab);
      this.fetchSymbols();
    },
    fetchSymbols() {
      this.$api.smartTrade
        .fetchSymbols()
        .then((result) => {
          this.coinMarketItems = result.symbols;
          this.orderRequest.symbol = result.symbols[0].value;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
      this.isExchangeListLoaded = true;
    },
    changeBuyForm(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.orderRequest[name] = Number(value);
    },
    changeExchange(value) {
      this.orderRequest.exchangeId = value;
    },
    changesymbol(value) {
      this.orderRequest.symbol = value;
    },
    changeOrderType(value) {
      const orderSide = this.toOrderSide(this.tab);
      this.orderType[orderSide] = value;
      this.orderRequest.orderType = value;
      this.orderRequest.price = -1;
    },
    changeOrderSide(value) {
      const orderSide = this.toOrderSide(value);
      this.orderRequest.orderSide = orderSide;
      this.orderRequest.orderType = this.orderType[orderSide];
      this.tab = value;
    },
    submitOrderRequest() {
      this.$api.smartTrade
        .creatOrder(this.orderRequest)
        .then(() => {
          this.errorMessage = "Order Submited";
          this.snackbar = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    toOrderSide(tab) {
      const tabTitle = this.tabsItem[tab].title;
      return tabTitle.toUpperCase();
    },
  },
};
</script>

<template>
  <div class="d-flex flex-col">
    <v-card elevation="0" class="p-x-5 Users__header">
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
    <div
      v-if="isExchangeListLoaded"
      class="h-1-1 d-flex flex-col ai-center jc-center"
    >
      <div class="Dashboard">Smart Trade</div>
      <form @change="changeBuyForm" @submit.prevent="submitOrderRequest">
        <!-- ToDo: because of a problem with text prop on both exchangeItems and
      coinMarketItems we had to add 2 redundant v-ifs, which should be removed. -->
        <BaseSelect
          :items="exchangeItems"
          v-if="exchangeItems[0]"
          label="Exchange"
          name="exchange"
          :selected="exchangeItems[0].text"
          @changed="changeExchange"
        />
        <BaseSelect
          :items="coinMarketItems"
          v-if="coinMarketItems[0]"
          label="Symbol"
          name="symbol"
          :selected="coinMarketItems[0].text"
          @changed="changesymbol"
        />
        <Tabs :items="tabsItem" @clicked="changeOrderSide" />
        <v-tabs-items v-model="tab" class="w-1-1">
          <ManualTrade
            text="Buy"
            @changed="changeOrderType"
            :selectedCoin="orderRequest.symbol"
          />
          <ManualTrade
            text="Sell"
            @changed="changeOrderType"
            :selectedCoin="orderRequest.symbol"
          />
          <ManualTrade />
        </v-tabs-items>
      </form>
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

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
