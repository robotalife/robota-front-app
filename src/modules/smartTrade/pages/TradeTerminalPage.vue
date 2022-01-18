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
      currentPrice: "",
      availableAsset: 0,
      screenSize: {
        height: window.screen.availHeight,
        width: window.screen.availWidth,
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
  mounted() {
    let tradingViewScript = document.createElement("script");
    tradingViewScript.setAttribute("src", "https://s3.tradingview.com/tv.js");
    document.head.appendChild(tradingViewScript);
  },
  updated: function () {
    this.$nextTick(function () {
      this.initTradingView();
      const tradingViewContainer = document.getElementById("tradingview_241f2");
      if (tradingViewContainer) {
        tradingViewContainer.children[0].style.width = "100%";
        tradingViewContainer.children[0].children[0].style.width = "100%";
      }
    });
  },
  created() {
    const exchangeListCurrentStatus = this.$store.state
      .exchangeListRequestStatus;
    if (exchangeListCurrentStatus === "success") {
      this.getUserExchanges();
    }
  },
  methods: {
    initTradingView() {
      new window.TradingView.widget({
        width: 980,
        height: 610,
        symbol: this.orderRequest.symbol.split("_").join(""),
        interval: "D",
        timezone: "Etc/UTC",
        theme: "light",
        style: "1",
        locale: "en",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: "tradingview_241f2",
      });
    },
    getUserExchanges() {
      const exchanges = this.$store.getters.exchangeListItem;
      console.log(exchanges);
      this.exchangeItems = exchanges;
      this.orderRequest.exchangeId = this.exchangeItems[0].value;
      this.orderRequest.orderSide = this.toOrderSide(this.tab);
      this.fetchSymbols(this.exchangeItems[0].value);
    },
    fetchSymbols(id) {
      this.$api.smartTrade
        .fetchSymbols(id)
        .then((result) => {
          this.coinMarketItems = result.symbols;
          this.orderRequest.symbol = result.symbols[0].value;
          this.fetchSelectedSymbolDetails(
            result.symbols[0].value,
            this.orderRequest.exchangeId
          );
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
      this.fetchSymbols(value);
    },
    changesymbol(value) {
      this.orderRequest.symbol = value;
      this.fetchSelectedSymbolDetails(value);
    },
    fetchSelectedSymbolDetails(value) {
      this.$api.smartTrade
        .fetchSymbolDetails(value, this.orderRequest.exchangeId)
        .then((result) => {
          this.currentPrice = String(result.price);
          this.availableAsset = result.available;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
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
  <div class="d-flex flex-col w-1-1">
    <div
      v-if="isExchangeListLoaded"
      class="h-1-1 w-1-1 d-flex flex-col ai-center jc-center"
    >
      <div class="d-flex w-1-1 jc-center ai-start m-t-4">
        <!-- TradingView Widget BEGIN -->
        <div class="TradingTerminal__trading-view m-r-2 w-1-1">
          <div id="tradingview_241f2" class="w-1-1"></div>
        </div>
        <!-- TradingView Widget END -->
        <form
          @change="changeBuyForm"
          @submit.prevent="submitOrderRequest"
          class="TradingTerminal__trading-form"
        >
          <div class="bg-white p-2">
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
            <v-tabs-items v-model="tab" class="w-1-1 m-t-1">
              <ManualTrade
                text="Buy"
                @changed="changeOrderType"
                :selectedCoin="orderRequest.symbol"
                :selectedCoinPrice="currentPrice"
                :availableAsset="availableAsset"
              />
              <ManualTrade
                text="Sell"
                @changed="changeOrderType"
                :selectedCoin="orderRequest.symbol"
                :selectedCoinPrice="currentPrice"
              />
              <ManualTrade />
            </v-tabs-items>
          </div>
        </form>
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
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.TradingTerminal {
  @include e(trading-view) {
    border: 2px solid $gray-10;
    border-radius: 8px;
  }

  @include e(trading-form) {
    margin-top: 2px;
    padding: 2px;
    background-image: $horizental;
    border-radius: 8px;
    min-width: 312px;

    > div {
      border-radius: 6px;
    }
  }
}

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
