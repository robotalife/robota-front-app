<script>
import BaseButton from "@/components/button/BaseButton";

export default {
  name: "BotTokensPage",
  components: {
    BaseButton,
  },
  created() {
    const botId = this.$route.params.id;
    this.$api.bots.getBotTokens(botId).then((result) => {
      this.botCommandStart = result.startCommand;
      this.botCommandStop = result.stopCommand;
    });
  },
  computed: {},
  data() {
    return {
      snackbarColor: "green",
      snackbar: false,
      botCommandStart:
        '{  "message_type": "bot",  "bot_id": 10125961,  "email_token": "adf832db-3d82-4ce5-b050-27bab0355839",  "delay_seconds": 0} ',
      botCommandStop:
        '{  "action": "close_at_market_price",  "message_type": "bot",  "bot_id": 10125961,  "email_token": "adf832db-3d82-4ce5-b050-27bab0355839",  "delay_seconds": 0}',
    };
  },
  methods: {
    copyToClipBoard(value) {
      navigator.clipboard.writeText(value);
      this.snackbar = true;
    },
  },
};
</script>
<template>
  <div class="d-flex m-t-3">
    <v-card class="BotTokensPage__card p-3 m-r-2" outlined>
      <div class="d-flex flex-col m-t-2">
        <div class="d-flex">
          <p class="gray-900 font-16-24 fw-500">Start Order</p>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-col">
            <div class="m-t-2">
              <p class="gray-500 text-sm fw-400">
                Message for deal start signal
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-col">
            <div class="m-t-2">
              <p class="gray-500 text-sm fw-400">{{ botCommandStart }}</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="m-t-2 m-b-2" />
      <div class="d-flex jc-end ai-center">
        <div @click="copyToClipBoard(botCommandStart)">
          <BaseButton
            before-icon="$copy"
            class="BotTokensPage__view-detail"
            text="Copy To Clipboard"
          >
          </BaseButton>
        </div>
      </div>
    </v-card>
    <v-card class="BotTokensPage__card p-3" outlined>
      <div class="d-flex flex-col m-t-2">
        <div class="d-flex">
          <p class="gray-900 font-16-24 fw-500">Close Order</p>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-col">
            <div class="m-t-2">
              <p class="gray-500 text-sm fw-400">
                Message to close order at Market Price
              </p>
            </div>
          </div>
        </div>
        <div class="d-flex">
          <div class="d-flex flex-col">
            <div class="m-t-2">
              <p class="gray-500 text-sm fw-400">{{ botCommandStop }}</p>
            </div>
          </div>
        </div>
      </div>
      <hr class="m-y-2" />
      <div class="d-flex jc-end ai-center">
        <div @click="copyToClipBoard(botCommandStop)">
          <BaseButton
            before-icon="$copy"
            class="BotTokensPage__view-detail"
            text="Copy To Clipboard"
          >
          </BaseButton>
        </div>
      </div>
    </v-card>
    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
      Copied.
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

.BotTokensPage {
  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    min-width: 425px;
  }

  @include e(view-detail) {
    color: $gray-700;
    background-color: $white !important;
    border-radius: 30px;
    border: 1px $gray-300 solid;
  }
}
</style>
