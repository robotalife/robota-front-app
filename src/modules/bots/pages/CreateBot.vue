<script>
import BaseInput from "@/components/input/BaseInput";
import BaseButton from "@/components/button/BaseButton";
import storage from "@/utils/storage";
import AutoCompleteSelect from "@/components/select/AutoCompleteSelect.vue";
import SwitchRadioGroup from "@/components/switch/SwitchRadioGroup";
import BaseSelect from "@/components/select/BaseSelect.vue";

export default {
  name: "CreateBot",
  components: {
    BaseInput,
    AutoCompleteSelect,
    SwitchRadioGroup,
    BaseSelect,
    BaseButton,
  },
  computed: {},
  data() {
    return {
      coinMarketItems: [],
      selectedExchange: "",
      leverageValue: 1,
      confirmationModal: false,
      orderStrategySwitchItems: [
        {
          title: "Short",
          value: "SHORT",
        },
        {
          title: "Long",
          value: "LONG",
        },
      ],
      orderTypeSwitchItems: [
        {
          title: "Market",
          value: "Market",
        },
        {
          title: "Limit",
          value: "LIMIT",
        },
      ],
      leverageTypeList: [
        { text: "Isolated", value: "ISOLATED" },
        { text: "Cross", value: "CROSS" },
      ],
      botRequest: {
        name: "",
        exchangeId: "",
        description: "",
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
      this.botRequest.configuration["orderType"] = "MARKET";
      this.botRequest.configuration["leverageType"] = "ISOLATED";
      this.botRequest.configuration["maxOrderSize"] = "10";
      this.botRequest.configuration["leverageValue"] = this.leverageValue;
      this.botRequest.exchangeId = this.selectedExchange;
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
    changeOrderTypeSwitch(value) {
      this.botRequest.configuration["orderType"] =
        this.orderTypeSwitchItems[value].value;
    },
    changeLeverageType(value) {
      this.botRequest.configuration["leverageType"] = value;
    },
    changeLeverageValue(value) {
      this.botRequest.configuration["leverageValue"] = value;
    },
    changeCreateForm(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.botRequest.configuration[name] = value;
      console.log("changed something in the form", name, value);
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
  <div class="d-flex flex-col w-1-4">
    <form @change="changeCreateForm" @submit.prevent="showDialog">
      <BaseInput
        label="Name"
        type="text"
        name="botName"
        placeholder="Bot Name"
        v-model="botRequest.name"
      ></BaseInput>
      <BaseInput
        label="Description"
        type="text"
        name="botDesc"
        placeholder="Bot Description"
        v-model="botRequest.description"
      ></BaseInput>
      <AutoCompleteSelect
        :items="coinMarketItems"
        v-if="coinMarketItems[0]"
        label="Symbol"
        name="symbol"
        :selected="coinMarketItems[0]"
        @changed="changeSymbol"
      />
      <SwitchRadioGroup
        :items="orderStrategySwitchItems"
        class="m-t-2"
        @clicked="changeStrategySwitch"
      />
      <SwitchRadioGroup
        :items="orderTypeSwitchItems"
        class="m-t-2"
        @clicked="changeOrderTypeSwitch"
      />
      <BaseInput
        label="Base Order Size"
        type="number"
        name="baseOrderSize"
        placeholder="Minimum Order value"
        v-model="botRequest.configuration['maxOrderSize']"
      ></BaseInput>
      <BaseSelect
        label="Leverage Type"
        :items="leverageTypeList"
        name="leverageType"
        :selected="leverageTypeList[0].text"
        class="CreateBot__leverage-type m-r-2"
        @changed="changeLeverageType"
      />
      <v-slider
        v-model="leverageValue"
        color="purple"
        track-color="gray"
        thumb-label="always"
        :max="100"
        :min="1"
        label="Leverage Custom Value"
        @change="changeLeverageValue"
      >
        <template v-slot:thumb-label="{ value }">
          <span class="CreateBot__thumb-label">
            {{ value + "x" }}
          </span>
        </template>
      </v-slider>
      <BaseButton
        text="Submit"
        class="w-1-1 m-t-3 font-body CreateBot__submit"
      />
    </form>
    <v-dialog v-model="confirmationModal" width="400" height="327">
      <div class="p-3 bg-white CreateBot__confirmation">
        <VIcon size="48" dark>$alert</VIcon>
        <p class="gray-2 m-t-2 font-h-2 fw-700">Confirm creating the bot</p>
        <div>
          <div class="d-flex jc-between">
            <p>Name</p>
            <p>{{ this.botRequest.name }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Description</p>
            <p>{{ this.botRequest.description }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Pair</p>
            <p>{{ this.botRequest.configuration.pair }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Strategy</p>
            <p>{{ this.botRequest.configuration.orderStrategy }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Type</p>
            <p>{{ this.botRequest.configuration.orderType }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Order Size</p>
            <p>{{ this.botRequest.configuration.maxOrderSize }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Leverage Type</p>
            <p>{{ this.botRequest.configuration.leverageType }}</p>
          </div>
        </div>
        <div>
          <div class="d-flex jc-between">
            <p>Leverage Value</p>
            <p>{{ this.botRequest.configuration.leverageValue + "x" }}</p>
          </div>
        </div>
        <div class="d-flex jc-between m-t-7">
          <div @click="confirmationModal = false" class="w-1-2">
            <BaseButton
              text="Cancel"
              class="TradingTerminal__confirmation-btn m-t-2 w-1-1"
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
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.CreateBot {
  @include e(submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;
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
