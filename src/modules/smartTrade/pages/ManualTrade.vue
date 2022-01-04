<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import SwitchRadioGroup from "@/components/switch/SwitchRadioGroup.vue";
export default {
  name: "ManualTrade",
  components: {
    BaseInput,
    BaseButton,
    SwitchRadioGroup,
  },
  props: {
    text: {
      type: String,
      default: "Submit",
    },
    selectedCoin: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      swichItems: [
        {
          title: "limit",
          value: "LIMIT",
        },
        {
          title: "Market",
          value: "MARKET",
        },
      ],
      selectedSwitch: 0,
      currentTab: 0,
      Base: "",
      Quote: "",
      positionSizeFieldValue: "",
    };
  },
  methods: {
    changeSwitch(value) {
      this.selectedSwitch = value;
    },
  },
  computed: {
    unitFieldValue: {
      get: function () {
        if (
          !this.positionSizeFieldValue ||
          this.positionSizeFieldValue === ""
        ) {
          return "";
        }
        const calculatedUnitFieldValue =
          Number(this.positionSizeFieldValue) / Number(this.price);
        return String(calculatedUnitFieldValue);
      },
      set: function (unitFieldValue) {
        if (!unitFieldValue || unitFieldValue === "") {
          return "";
        }
        const calculatedPositionSizeFieldValue =
          Number(unitFieldValue) * Number(this.price);
        this.positionSizeFieldValue = String(calculatedPositionSizeFieldValue);
      },
    },
  },
  watch: {
    selectedSwitch: function () {
      this.$emit("changed", this.swichItems[this.selectedSwitch].value);
    },
    selectedCoin: function () {
      this.Base = this.selectedCoin.split("_")[0];
      this.Quote = this.selectedCoin.split("_")[1];
    },
  },
};
</script>

<template>
  <v-tab-item :transition="false" class="w-1-1">
    <SwitchRadioGroup
      :items="swichItems"
      class="m-t-2"
      @clicked="changeSwitch"
    />
    <BaseInput
      label="Price"
      type="Number"
      name="price"
      class="m-t-2"
      :unit="Quote"
      v-model="price"
      :disabled="selectedSwitch == 1 ? true : false"
    />
    <BaseInput
      type="Number"
      label="Position Size (Total)"
      name="Total"
      :unit="Quote"
      v-model="positionSizeFieldValue"
    />
    <BaseInput
      type="Number"
      label="Unit"
      :unit="Base"
      name="quantity"
      class="m-t-2"
      v-model="unitFieldValue"
    />
    <BaseButton :text="text" class="w-1-1 m-t-2" />
  </v-tab-item>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Domain {
  @include e(cartesian-gird) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 32px;
  }
}
</style>
