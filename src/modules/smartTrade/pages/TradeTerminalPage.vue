<script>
import BaseSelect from "@/components/select/BaseSelect.vue";
import AutoCompleteSelect from "@/components/select/AutoCompleteSelect.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import ManualTrade from "./ManualTrade.vue";
import storage from "@/utils/storage";
export default {
  name: "TradingTerminal",
  components: {
    BaseSelect,
    AutoCompleteSelect,
    Tabs,
    BaseButton,
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
      availableBaseAsset: 0,
      availableQouteAsset: 0,
      screenSize: {
        height: window.screen.availHeight,
        width: window.screen.availWidth,
      },
      selectedExchange: "",
      value: 0,
      isLoading: false,
      confirmationModal: false,
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
    checkSelectedExchange() {
      return this.$store.state.selectedExchange;
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      if (state === "success") {
        this.getUserExchanges();
      }
    },
    checkSelectedExchange(state) {
      const selectedExchangeObj = this.exchangeItems.filter((item) => {
        return item.value == state;
      });
      this.selectedExchange = selectedExchangeObj[0].text;
    },
    currentPrice(value) {
      this.orderRequest.price = Number(value);
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
      const tradingViewContainer = document.getElementById(
        "tradingviewContainer"
      );
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
      const selectedExchangeIdInStore = this.$store.getters.selectedExchange;
      this.selectedExchange = this.exchangeItems.filter((item) => {
        return item.value === selectedExchangeIdInStore;
      });
    }
  },
  methods: {
    updateQuantityValue(value) {
      this.orderRequest.quantity = value;
    },
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
        container_id: "tradingviewContainer",
      });
    },
    getUserExchanges() {
      const exchanges = this.$store.getters.exchangeListItem;
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
      //everything other than symbol here is a number
      //symbol and other properties are going to be updated in other parts of code
      if (name === "symbol") {
        return;
      } else {
        this.orderRequest[name] = Number(value);
      }
    },
    changeExchange(value) {
      this.orderRequest.exchangeId = value;
      this.fetchSymbols(value);
    },
    changesymbol(value) {
      console.log(value, "symbol change");
      this.orderRequest.symbol = value;
      this.fetchSelectedSymbolDetails(value);
    },
    fetchSelectedSymbolDetails(value) {
      this.$api.smartTrade
        .fetchSymbolDetails(value, this.orderRequest.exchangeId)
        .then((result) => {
          console.log("result", result);
          this.currentPrice = String(result.price);
          this.availableBaseAsset = result.baseAsset.availableToTrade;
          this.availableQouteAsset = result.qouteAsset.availableToTrade;
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
      this.isLoading = true;
      this.$api.smartTrade
        .creatOrder(this.orderRequest)
        .then(() => {
          this.isLoading = false;
          this.errorMessage = "Order Submitted";
          this.snackbarColor = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
          this.snackbarColor = "red";
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
  <div class="TradingTerminal d-flex flex-col w-1-1">
    <div
      v-if="isExchangeListLoaded"
      class="h-1-1 w-1-1 d-flex flex-col ai-center jc-center"
    >
      <div class="d-flex w-1-1 jc-center ai-start m-t-4">
        <!-- TradingView Widget BEGIN -->
        <div class="TradingTerminal__trading-view m-r-2 w-1-1">
          <div id="tradingviewContainer" class="w-1-1"></div>
        </div>
        <!-- TradingView Widget END -->
        <form
          @change="changeBuyForm"
          @submit.prevent="confirmationModal = true"
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
              :selected="selectedExchange"
              @changed="changeExchange"
            />
            <AutoCompleteSelect
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
                @update="updateQuantityValue"
                :selectedCoin="orderRequest.symbol"
                :selectedCoinPrice="currentPrice"
                :availableQouteAsset="availableQouteAsset"
                :availableBaseAsset="availableBaseAsset"
                :isFormLoading="isLoading"
              />
              <ManualTrade
                text="Sell"
                @update="updateQuantityValue"
                @changed="changeOrderType"
                :availableQouteAsset="availableQouteAsset"
                :availableBaseAsset="availableBaseAsset"
                :selectedCoin="orderRequest.symbol"
                :selectedCoinPrice="currentPrice"
                :isFormLoading="isLoading"
              />
              <ManualTrade :isFormLoading="true" />
            </v-tabs-items>
          </div>
        </form>
      </div>
      <v-dialog v-model="confirmationModal" width="400" height="327">
        <div class="p-3 bg-white TradingTerminal__confirmation">
          <VIcon size="48" dark>$alert</VIcon>
          <p class="gray-2 m-t-2 font-h-2 fw-700">Confirm of a transaction</p>
          <div>
            <div class="d-flex jc-between">
              <p>Units</p>
              <p>
                {{
                  orderRequest.quantity +
                  " " +
                  orderRequest.symbol.split("_")[0]
                }}
              </p>
            </div>
            <div class="d-flex jc-between">
              <p>
                {{ orderRequest.orderSide === "SELL" ? "Sell" : "Buy" }}
                Price
              </p>
              <p>{{ orderRequest.price }}</p>
            </div>
            <div class="d-flex jc-between">
              <p>Total</p>
              <p>
                {{
                  parseFloat(
                    (orderRequest.quantity * orderRequest.price).toFixed(8)
                  )
                }}
              </p>
            </div>
          </div>
          <div class="d-flex jc-between m-t-7">
            <div @click="confirmationModal = false" class="w-1-2">
              <BaseButton
                text="Cancel"
                class="TradingTerminal__confirmation-btn m-t-2 w-1-1"
              />
            </div>
            <div @click="submitOrderRequest" class="w-1-2 m-l-1">
              <BaseButton
                text="Confirm"
                :isLoading="isLoading"
                class="TradingTerminal__confirmation-btn TradingTerminal__confirmation-btn--confirm bg-purple m-t-2 w-1-1"
              />
            </div>
          </div>
        </div>
      </v-dialog>
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

  @include e(confirmation) {
    border-radius: 12px;

    &-btn {
      border-radius: 32px;

      @include m(confirm) {
        color: $white;
        background: #7f56d9;
      }
    }
  }
}

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
