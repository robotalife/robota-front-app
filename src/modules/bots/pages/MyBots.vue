<script>
import BaseButton from "@/components/button/BaseButton";

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
      botList: [
        {
          id: "1096742",
          name: "Your bot1",
          desc: "Feature Robotalife Bot",
          profit: "+ 6.2 %",
        },
      ],
    };
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
  <div class="Mine__cartesian-grid w-1-2">
    <v-card
      v-for="(bot, index) in botList"
      :key="index"
      elevation="0"
      class="Market__card p-3"
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
      <div
        class="d-flex jc-end m-t-5"
        @click="() => showConfirmDeleteDialog(bot)"
      >
        <BaseButton beforeIcon="$refresh" class="Mine__edit" text="ٌEdit">
        </BaseButton>
        <BaseButton beforeIcon="$trash" class="Mine__delete" text="Delete">
        </BaseButton>
      </div>
    </v-card>
    <div
      class="Mine__add-bot d-flex ai-center jc-center"
      @click="moveToCreateBotPage()"
    >
      <BaseButton class="bg-brand-purple Mine__add-btn" text="Create Bot" />
    </div>
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

.Mine {
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
    border: 2px solid $green;
    background: white !important;
    color: $green;
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
}
</style>
