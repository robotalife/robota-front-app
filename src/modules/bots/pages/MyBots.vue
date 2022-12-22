<script>
import BaseButton from "@/components/button/BaseButton";
import storage from "@/utils/storage";

export default {
  name: "MyBots",
  components: { BaseButton },
  computed: {},
  data() {
    return {
      snackbar: false,
      snackMessage: "",
      snackbarColor: "pink",
      selectedBot: null,
      selectedExchange: null,
      confirmDeleteDialogSwitch: false,
      botList: [],
    };
  },
  mounted() {
    this.selectedExchange = storage.getItem("selectedExchange");
    this.$api.bots.getOwnBots(this.selectedExchange).then((result) => {
      this.botList = result;
    });
  },
  methods: {
    showConfirmDeleteDialog(bot) {
      this.confirmDeleteDialogSwitch = true;
      this.selectedBot = bot;
    },
    closeConfirmDialog() {
      this.confirmDeleteDialogSwitch = false;
      this.selectedBot = null;
    },
    deleteBot() {
      this.$api.bots
        .deleteBot(this.selectedBot.id)
        .then(() => {
          this.confirmDeleteDialogSwitch = false;
          this.selectedBot = null;
        })
        .catch(() => {
          this.snackMessage = "There is a problem with deleting the bot";
          this.snackbar = true;
          this.snackbarColor = "red";
        });
    },
    moveToCreateBotPage() {
      this.$router.push({ name: "create" });
    },
    showSuccessSnack() {
      this.snackbar = true;
      this.snackbarColor = "green";
    },
    showErrorSnack() {
      this.snackbar = true;
      this.snackbarColor = "red";
    },
  },
};
</script>
<template>
  <div class="Mine__cartesian-grid">
    <v-card
      v-for="(bot, index) in botList"
      :key="index"
      class="Mine__card p-3"
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
          <span>{{ bot.exchangeType }}</span>
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
              class="bg-brand-purple Mine__view-detail"
              text="View Bot Detail"
            >
            </BaseButton>
          </div>
        </div>
        <div class="Mine__badge">
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
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Mine {
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

  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    min-width: 425px;
  }
  @include e(edit) {
    color: $blue;
    border-radius: 16px;

    ::v-deep .v-btn__content {
      font-size: 12px;
      line-height: 24px;
      font-weight: 700;
    }
  }
  @include e(confirm-btn) {
    border: 2px solid $red;
    background: white !important;
    color: $red;
    font-size: 12px;
    line-height: 24px;
    border-radius: 30px;
  }

  @include e(delete) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 30px;
    color: $gray-6;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    background-color: white !important;
    padding: 0 22px;

    ::v-deep .v-icon__component,
    .v-icon__svg {
      height: 12px !important;
      width: 12px !important;
    }
  }
  @include e(delete) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 30px;
    color: $gray-6;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    background-color: white !important;
    padding: 0 22px;

    ::v-deep .v-icon__component,
    .v-icon__svg {
      height: 12px !important;
      width: 12px !important;
    }
  }

  @include e(add-bot) {
    background: $gray-10;
    border-radius: 8px;
    min-height: 152px;
    min-width: 239px;
  }
  @include e(add-btn) {
    color: $white;
    border-radius: 16px;

    ::v-deep .v-btn__content {
      font-size: 12px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(view-detail) {
    color: $gray-700;
    background-color: $white !important;
    border-radius: 30px;
    border: 1px $gray-300 solid;
  }
}
</style>
