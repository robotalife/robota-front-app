<script>
import BaseInput from "@/components/input/BaseInput";
import storage from "@/utils/storage";
import AutoCompleteSelect from "@/components/select/AutoCompleteSelect.vue";
import SwitchRadioGroup from "@/components/switch/SwitchRadioGroup";
import BaseSelect from "@/components/select/BaseSelect.vue";

export default {
  name: "CreateBot",
  components: { BaseInput, AutoCompleteSelect, SwitchRadioGroup, BaseSelect },
  computed: {},
  data() {
    return {
      coinMarketItems: [],
      selectedExchange: "",
      leverageValue: 1,
      orderTypeSwitchItems: [
        {
          title: "Short",
          value: "SHORT",
        },
        {
          title: "Long",
          value: "LONG",
        },
      ],
      orderSideSwitchItems: [
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
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.selectedExchange = storage.getItem("selectedExchange");
      console.log(this.selectedExchange, "selectedExchange");
      this.fetchSymbols(this.selectedExchange);
    },
    fetchSymbols(id) {
      this.$api.smartTrade
        .fetchSymbols(id)
        .then((result) => {
          this.coinMarketItems = result.symbols;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    changeSymbol(value) {
      console.log("symbol has changed", value);
    },
    changeTypeSwitch(value) {
      console.log("switch has changed", value);
    },
    changeSideSwitch(value) {
      console.log("switch has changed", value);
    },
    changeLeverageType(value) {
      console.log("changed leverage", value);
    },
    changeLeverageValue(value) {
      console.log("leverage value has changed", value);
    },
  },
};
</script>
<template>
  <div class="d-flex flex-col w-1-4">
    <form>
      <BaseInput label="Name" type="text" name="botName"></BaseInput>
      <BaseInput label="Description" type="text" name="botDesc"></BaseInput>
      <AutoCompleteSelect
        :items="coinMarketItems"
        v-if="coinMarketItems[0]"
        label="Symbol"
        name="symbol"
        :selected="coinMarketItems[0]"
        @changed="changeSymbol"
      />
      <SwitchRadioGroup
        :items="orderTypeSwitchItems"
        class="m-t-2"
        @clicked="changeTypeSwitch"
      />
      <SwitchRadioGroup
        :items="orderSideSwitchItems"
        class="m-t-2"
        @clicked="changeSideSwitch"
      />
      <BaseInput
        label="Base Order Size"
        type="number"
        name="baseOrderSize"
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
    </form>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.CreateBot {
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
}
</style>
