<script>
import BaseInput from "@/components/input/BaseInput";
import BaseButton from "@/components/button/BaseButton";
import storage from "@/utils/storage";
import AutoCompleteSelect from "@/components/select/AutoCompleteSelect.vue";
import SwitchRadioGroup from "@/components/switch/SwitchRadioGroup";
import BaseSelect from "@/components/select/BaseSelect.vue";
import CreateBotDialogInfo from "@/modules/bots/components/CreateBotDialogInfo";

export default {
  name: "CreateBot",
  components: {
    BaseInput,
    AutoCompleteSelect,
    SwitchRadioGroup,
    BaseSelect,
    BaseButton,
    CreateBotDialogInfo,
  },
  computed: {},
  data() {
    return {
      errorMessage: "",
      snackbar: false,
      snackbarColor: "red",
      exchangeItems: [
        {
          value: "ebb84d68-8966-4f39-ac10-1ab8d353e6d6",
          text: "Binance-test",
        },
      ],
      botAccessTypes: [
        {
          title: "Private",
          value: "PRIVATE",
        },
        {
          title: "Public",
          value: "PUBLIC",
        },
      ],
      coinMarketItems: [],
      selectedExchange: "",
      leverageValue: 1,
      confirmationModal: false,
      orderStrategySwitchItems: [
        {
          title: "Long",
          value: "LONG",
        },
        {
          title: "Short",
          value: "SHORT",
        },
      ],
      marginTypeList: [
        { title: "Isolated", value: "ISOLATED" },
        { title: "Cross", value: "CROSS" },
      ],
      leverageValueList: [
        { title: "1x", value: "1" },
        { title: "2x", value: "2" },
        { title: "3x", value: "3" },
        { title: "5x", value: "5" },
        { title: "10x", value: "10" },
        { title: "25x", value: "25" },
        { title: "100xx", value: "100" },
      ],
      botRequest: {
        name: "",
        exchangeId: "",
        configuration: {},
      },
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.confirmationModal = false;
      this.selectedExchange = storage.getItem("selectedExchange");
      this.botRequest.configuration["orderStrategy"] = "SHORT";
      //this.botRequest.configuration["orderType"] = "MARKET";
      this.botRequest.configuration["marginType"] = "ISOLATED";
      this.botRequest.configuration["leverageValue"] = this.leverageValue;
      this.botRequest.configuration["access"] = "PRIVATE";
      this.botRequest.exchangeId = this.selectedExchange;
      this.botRequest.configuration["minAmountForBotUsage"] = 10;
      this.botRequest.configuration["maxAmountForBotUsage"] = 100;
      this.botRequest.configuration["monthlyPrice"] = 10;
      this.botRequest.configuration["yearlyPrice"] = 120;
      console.log(this.selectedExchange, "selectedExchange");
      this.fetchSymbols(this.selectedExchange);
    },
    fetchSymbols(id) {
      this.$api.smartTrade
        .fetchSymbols(id)
        .then((result) => {
          this.coinMarketItems = result.symbols;
          this.botRequest.configuration["pair"] = this.coinMarketItems[0].value;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    changeSymbol(value) {
      this.botRequest.configuration["pair"] = value;
    },
    changeStrategySwitch(value) {
      this.botRequest.configuration["orderStrategy"] =
        this.orderStrategySwitchItems[value].value;
    },
    changeAccessSwitch(value) {
      this.botRequest.configuration["access"] =
        this.botAccessTypes[value].value;
    },
    // changeOrderTypeSwitch(value) {
    //   this.botRequest.configuration["orderType"] =
    //     this.orderTypeSwitchItems[value].value;
    // },
    changeMarginType(value) {
      this.botRequest.configuration["marginType"] =
        this.marginTypeList[value].value;
    },
    changeLeverageValue(value) {
      this.botRequest.configuration["leverageValue"] = value;
    },
    changeExchange(value) {
      console.log(value);
      this.botRequest.exchangeId = value;
    },
    changeCreateForm(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.botRequest.configuration[name] = value;
      console.log("changed something in the form", name, value);
    },
    changeMinAmount(value) {
      console.log("changed min amount", value);
      this.botRequest.configuration.minAmountForBotUsage = value;
    },
    showDialog() {
      console.log("form", this.botRequest);
      this.confirmationModal = true;
    },
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
  <div>
    <div class="d-flex flex-col">
      <p class="m-t-4 gray-900 fw-500 font-18-28">Main Setting</p>
      <form
        @submit.prevent="showDialog"
        @change="changeCreateForm"
        class="m-t-3"
      >
        <!-- Name -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Name</p>
            <p class="CreateBot__label-support">
              Please give this bot a unique name so reporting and management is
              easier.
            </p>
          </div>
          <div class="d-flex">
            <BaseInput
              type="text"
              name="botName"
              v-model="botRequest.name"
              class="CreateBot__form-input"
            ></BaseInput>
          </div>
        </div>
        <!-- /.Name -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Exchange -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Exchange</p>
            <p class="CreateBot__label-support">
              This is the exchange account the bot will use for any deals it
              creates.
            </p>
          </div>
          <div class="d-flex">
            <BaseSelect
              :items="exchangeItems"
              label=""
              name="exchange"
              @changed="changeExchange"
              :selected="exchangeItems[0].value"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Exchange -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Pair -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Pair</p>
            <p class="CreateBot__label-support">
              Please select the Trading Pair this bot can use.
            </p>
          </div>
          <div class="d-flex">
            <AutoCompleteSelect
              :items="coinMarketItems"
              v-if="coinMarketItems[0]"
              name="symbol"
              :selected="coinMarketItems[0]"
              @changed="changeSymbol"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Pair -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />

        <p class="m-t-4 gray-900 fw-500 font-18-28 m-t-3">Strategy</p>
        <hr style="width: 846px; height: 1px" class="m-y-2" />

        <!-- Strategy -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Strategy</p>
            <p class="CreateBot__label-support">
              PleaLong bots profit when asset prices rise, Short bots profit
              when asset prices fall.
            </p>
          </div>
          <div class="d-flex">
            <SwitchRadioGroup
              :items="orderStrategySwitchItems"
              class="m-y-2"
              @clicked="changeStrategySwitch"
            />
          </div>
        </div>
        <!-- /.Strategy -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Access -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Access</p>
            <p class="CreateBot__label-support">
              bot is for your personal use or want to make it public ?
            </p>
          </div>
          <div class="d-flex">
            <SwitchRadioGroup
              :items="botAccessTypes"
              class="m-t-2"
              @clicked="changeAccessSwitch"
            />
          </div>
        </div>
        <!-- /.Access -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Leverage Type -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Leverage Type</p>
            <p class="CreateBot__label-support text-decoration-underline">
              What is leverage type?
            </p>
          </div>
          <div class="d-flex">
            <SwitchRadioGroup
              :items="marginTypeList"
              class="m-t-2"
              @clicked="changeMarginType"
            />
          </div>
        </div>
        <!-- /.Leverage Type -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Leverage Value -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Leverage Value</p>
            <p class="CreateBot__label-support text-decoration-underline">
              What is leverage?
            </p>
          </div>
          <div class="d-flex" style="width: 383px">
            <SwitchRadioGroup
              :items="leverageValueList"
              class="m-t-2"
              @clicked="changeLeverageValue"
            />
          </div>
        </div>
        <!-- /.Leverage Value -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <p class="m-t-4 gray-900 fw-500 font-18-28 m-t-3">Usage</p>
        <hr style="width: 846px; height: 1px" class="m-y-2" />

        <!-- Min Amount -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Min amount for bot usage</p>
          </div>
          <div class="d-flex">
            <BaseInput
              :step="'1'"
              :unit="'$'"
              type="Number"
              name="minAmountForBotUsage"
              @change="changeMinAmount"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Min Amount -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Max Amount -->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Max amount for bot usage</p>
          </div>
          <div class="d-flex">
            <BaseInput
              :step="'1'"
              :unit="'$'"
              type="Number"
              name="maxAmountForBotUsage"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Max Amount -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <p class="m-t-4 gray-900 fw-500 font-18-28 m-t-3">Price</p>
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Monthly Bot Price-->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Monthly Bot Price</p>
          </div>
          <div class="d-flex">
            <BaseInput
              :step="'1'"
              :unit="'$'"
              type="Number"
              name="monthlyPrice"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Monthly Bot Price -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <!-- Yearly Bot Price-->
        <div class="d-flex jc-start form-content">
          <div class="d-flex flex-col CreateBot__form-label-group">
            <p class="CreateBot__form-label">Yearly Bot Price</p>
          </div>
          <div class="d-flex">
            <BaseInput
              :step="'1'"
              :unit="'$'"
              type="Number"
              name="yearlyPrice"
              class="CreateBot__form-input"
            />
          </div>
        </div>
        <!-- /.Yearly Bot Price -->
        <hr style="width: 846px; height: 1px" class="m-y-2" />
        <BaseButton
          text="Save"
          class="m-t-3 m-r-2 font-body CreateBot__submit"
        />
      </form>
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
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.form-content {
  padding: 0;
  gap: 32px;
  min-width: 846px;
}

.CreateBot {
  @include e(form-label-group) {
    width: 280px;
    height: 60px;
  }
  @include e(form-input) {
    min-width: 512px;
  }
  @include e(form-label) {
    font-weight: 500;
    color: $gray-700;
    font-size: 14px;
    line-height: 20px;
  }
  @include e(label-support) {
    font-weight: 400;
    color: $gray-500;
    font-size: 14px;
    line-height: 20px;
  }
  @include e(submit) {
    color: $white;
    background-color: $brand-purple !important;
    border-radius: 30px;
  }

  @include e(cancel) {
    color: $gray-700;
    background-color: $white !important;
    border-radius: 30px;
    border: 1px $gray-300 solid;
  }
  @include e(leverage-type) {
    ::v-deep .v-text-field__details {
      display: none;
    }
  }
  @include e(thumb-label) {
    color: $purple;
  }

  ::v-deep .v-slider__thumb-label {
    position: relative !important;
    bottom: -30px !important;
    background: none !important;
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
