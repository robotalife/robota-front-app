<script>
import BaseButton from "@/components/button/BaseButton";
import BaseInput from "@/components/input/BaseInput.vue";
import PageTitle from "@/components/title/PageTitle.vue";
import storage from "@/utils/storage";

export default {
  name: "Store",
  components: { BaseButton, BaseInput, PageTitle },
  computed: {},
  data() {
    return {
      snackbar: false,
      snackMessage: "",
      snackbarColor: "pink",
      selectedBot: null,
      selectedExchange: null,
      overrides: {
        maxAmountFromAccount: "",
        fixedAmountPerOrder: "",
      },
      connectDialogSwitch: false,
      botList: [
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
        {
          name: "DYDX-USDT",
          profit: "+18.5%",
          exchange: "Binance Futures USDT-M",
          pair: "BNBUSDT",
          icon: "",
          price: "15$/Month",
        },
      ],
    };
  },
  mounted() {
    this.selectedExchange = storage.getItem("selectedExchange");
    this.$api.bots.getBotsInStore(this.selectedExchange).then((result) => {
      this.botList = result;
    });
  },
  methods: {
    connectToBot() {
      //selectedBot, selectedExchange, overrides
      console.log(
        "sending {}, bot,selectedExchange,overrides",
        this.selectedBot,
        this.selectedExchange,
        this.overrides
      );
      this.$api.bots
        .followBot(this.selectedBot.id, this.selectedExchange, this.overrides)
        .then((result) => this.handleFollowRequestSuccess(result))
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
          this.snackbarColor = "red";
        });
    },
    showConnectDialog(bot) {
      this.selectedBot = bot;
      this.connectDialogSwitch = true;
    },
    closeConnectDialog() {
      this.connectDialogSwitch = false;
      this.selectedBot = null;
    },
    showSuccessSnack() {
      this.snackbar = true;
      this.snackbarColor = "green";
    },
    showErrorSnack() {
      this.snackbar = true;
      this.snackbarColor = "red";
    },
    handleFollowRequestSuccess(result) {
      console.log("connected", result);
    },
  },
};
</script>
<template>
  <div class="Store d-flex flex-col w-1-1">
    <PageTitle text="Bot Store" />
    <div class="d-flex flex-col m-b-3">
      <v-alert prominent outlined color="#7F56D9" v-if="!selectedExchange">
        <v-row align="center">
          <v-col class="grow">
            <b>Welcome to RobotaLife !</b> To begin, connect Robota to your
            exchange account.
          </v-col>
          <v-col class="shrink">
            <BaseButton
              before-icon="$add"
              text="Add Exchange"
              class="Store__add-exchange"
            />
          </v-col>
        </v-row>
      </v-alert>
    </div>

    <div class="m-b-3">
      <p class="gray-900 font-h-2 fw-500">Bots Store</p>
      <p class="gray-500 fw-400">
        Trade strategies automatically, overcome emotions with bots, and never
        miss market opportunities.
      </p>
    </div>
    <div class="Store__cartesian-grid">
      <v-card
        v-for="(bot, index) in botList"
        :key="index"
        class="Store__card p-3"
        outlined
      >
        <div class="d-flex flex-col m-t-2">
          <div class="d-flex">
            <p class="gray-900 font-18-28 fw-600">{{ bot.name }}</p>
          </div>
          <div class="d-flex">
            <div class="d-flex flex-col">
              <div class="m-t-2">
                <p class="grey-500 text-sm">Net Profit last month</p>
              </div>
              <div class="m-t-1">
                <p class="grey-900 fw-600 font-36-44">{{ bot.profit }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="m-t-2 m-b-2" />
        <div class="d-flex jc-between ai-center" style="gap: 9px">
          <div>
            <VIcon>$exchange</VIcon>
            <span>{{ bot.exchange }}</span>
          </div>
          <div>
            <VIcon>$pair</VIcon>
            <span>{{ bot.pair }}</span>
          </div>
        </div>
        <hr class="m-y-2" />
        <div class="d-flex jc-between ai-center">
          <div>
            <div @click="() => showConnectDialog(bot)">
              <BaseButton
                before-icon="$copy"
                class="bg-brand-purple Store__copy"
                text="Copy Bot"
              >
              </BaseButton>
            </div>
          </div>
          <div>
            <p class="gray-500">View Bot Detail</p>
          </div>
          <div class="Store__badge">
            <p
              class="fw-500 font-12-18 success-700"
              style="mix-blend-mode: multiply"
            >
              {{ bot.price }}
            </p>
          </div>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="connectDialogSwitch" width="550" height="600">
      <div class="p-2 bg-white">
        <p class="gray-2 font-h-2 fw-700">Connect to bot</p>
        <p class="gray-2 font-body fw-400 m-t-1">
          You are now going to follow this bot. if you are not already aware of
          what would happen, please read the guides before. You must tell the
          bot how much investment it should put for each order.
        </p>
        <form class="m-t-3 bg-white" @submit.prevent="connectToBot">
          <BaseInput
            label="Maximum amount from the balance"
            name="maxAmountFromAccount"
            v-model="overrides.maxAmountFromAccount"
          />
          <BaseInput
            label="Fixed amount per order"
            name="fixedAmountPerOrder"
            v-model="overrides.fixedAmountPerOrder"
          />
          <BaseButton
            text="Follow Bot"
            class="w-1-1 Store__dialog-submit m-t-2"
          />
        </form>
      </div>
    </v-dialog>
    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
      {{ snackMessage }}
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

.Store {
  overflow-y: scroll;
  height: 90vh;
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
  @include e(cartesian-grid) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 24px;
  }
  @include e(badge) {
    background: #ecfdf3;
    border-radius: 16px;
    padding: 2px 8px;
  }
  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    min-width: 312px;
  }
  @include e(copy) {
    color: $gray-700;
    font-weight: 500;
    order: 1;
    border-radius: 32px;
    background: $white !important;
    box-sizing: border-box;
    border: 1px solid $gray-300;

    ::v-deep .v-btn__content {
      font-size: 12px;
      line-height: 24px;
      font-weight: 700;
    }
  }
  @include e(confirm-btn) {
    border: 2px solid $green;
    background: white !important;
    color: $green;
    font-size: 12px;
    line-height: 24px;
    border-radius: 30px;
  }
  @include e(add-exchange) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 30px;
    color: $white;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    background-color: $brand-purple !important;
    padding: 0 22px;
    ::v-deep .v-icon__component,
    .v-icon__svg {
      height: 12px !important;
      width: 12px !important;
    }
  }
}
</style>
