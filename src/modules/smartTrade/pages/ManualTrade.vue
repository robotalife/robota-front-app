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
    };
  },
  methods: {
    changeSwitch(value) {
      this.selectedSwitch = value;
    },
  },
  watch: {
    selectedSwitch: function () {
      this.$emit("changed", this.swichItems[this.selectedSwitch].value);
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
      label="Buy Price"
      type="Number"
      name="price"
      class="m-t-2"
      :disabled="selectedSwitch == 1 ? true : false"
    />
    <BaseInput
      type="Number"
      label="Position Size (Total)"
      name="Total"
      :disabled="true"
    />
    <BaseInput type="Number" label="Unit" name="quantity" class="m-t-2" />
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
