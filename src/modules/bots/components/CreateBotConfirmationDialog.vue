<script>
import CreateBotDialogInfo from "@/modules/bots/components/CreateBotDialogInfo";
import BaseButton from "@/components/button/BaseButton";

export default {
  name: "CreateBotConfirmationDialog",
  props: {
    botRequest: {
      type: Object,
      default: null,
    },
    confirmationModal: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CreateBotDialogInfo,
    BaseButton,
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    createBot() {
      console.log("submitted the form", this.botRequest);
      this.$api.bots
        .createBot(this.botRequest)
        .then(() => {
          this.confirmationModal = false;
          this.snackbar = true;
          this.errorMessage =
            "The bot has been created, you can view it in the Bots tab.";
          this.snackbarColor = "green";
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
  },
};
</script>
<template>
  <v-dialog v-model="confirmationModal" width="400" height="327">
    <div class="p-3 bg-white CreateBot__confirmation">
      <div class="d-flex ai-center jc-center">
        <VIcon size="48" dark>$zap</VIcon>
      </div>
      <div class="d-flex ai-center jc-center">
        <p class="gray-2 m-t-2 font-h-2 fw-700">Save Changes?</p>
      </div>
      <CreateBotDialogInfo title="Name" :value="botRequest.name" />
      <CreateBotDialogInfo
        title="Pair"
        :value="botRequest.configuration.pair"
      />
      <CreateBotDialogInfo
        title="Strategy"
        :value="botRequest.configuration.orderStrategy"
      /><CreateBotDialogInfo
        title="Min amount for bot usage"
        :value="botRequest.configuration.minAmountForBotUsage"
      />
      <CreateBotDialogInfo
        title="Max amount for bot usage"
        :value="botRequest.configuration.maxAmountForBotUsage"
      />
      <CreateBotDialogInfo
        title="Monthly Price"
        :value="botRequest.configuration.monthlyPrice"
      />
      <CreateBotDialogInfo
        title="Yearly Price"
        :value="botRequest.configuration.yearlyPrice"
      />
      <CreateBotDialogInfo
        title="Margin Type"
        :value="botRequest.configuration.marginType"
      />
      <CreateBotDialogInfo
        title="Leverage Value"
        :value="botRequest.configuration.leverageValue + 'x'"
      />

      <div class="d-flex jc-between m-t-7">
        <div @click="confirmationModal = false" class="w-1-2">
          <BaseButton
            text="Cancel"
            class="CreateBot__confirmation-btn m-t-2 w-1-1"
          />
        </div>
        <div @click="createBot" class="w-1-2 m-l-1">
          <BaseButton
            text="Confirm"
            class="CreateBot__confirmation-btn CreateBot__confirmation-btn--confirm bg-purple m-t-2 w-1-1"
          />
        </div>
      </div>
    </div>
  </v-dialog>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.CreatBot {
  @include e(cancel) {
    color: $gray-700;
    background-color: $white !important;
    border-radius: 30px;
    border: 1px $gray-300 solid;
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
</style>
