<script>
import BaseButton from "@/components/button/BaseButton";
import BaseInput from "@/components/input/BaseInput.vue";

import storage from "@/utils/storage";

export default {
  name: "Store",
  components: { BaseButton, BaseInput },
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
      botList: [],
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
  <div class="Store__cartesian-grid w-1-2">
    <v-card
      v-for="(bot, index) in botList"
      :key="index"
      elevation="0"
      class="Store__card p-3"
      outlined
    >
      <div class="d-flex jc-between">
        <p class="gray-2 font-body fw-700">{{ bot.name }}</p>
      </div>
      <div class="d-flex jc-between">
        <p class="gray-4 font-body fw-500">{{ bot.desc }}</p>
      </div>
      <div class="d-flex jc-between">
        <p class="font-body fw-500">Profit : {{ bot.profit }}</p>
      </div>
      <div class="d-flex jc-start m-t-5" @click="() => showConnectDialog(bot)">
        <base-button class="bg-brand-purple Market__connect" text="Connect">
        </base-button>
      </div>
    </v-card>
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
  @include e(cartesian-grid) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 24px;
  }

  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    min-width: 312px;
  }
  @include e(connect) {
    color: $white;
    border-radius: 16px;

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
}
</style>
