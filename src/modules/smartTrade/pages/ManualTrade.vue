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
    selectedCoinPrice: {
      type: String,
      default: "",
    },
    availableQouteAsset: {
      type: Number,
      default: 0,
    },
    availableBaseAsset: {
      type: Number,
      default: 0,
    },
    isFormLoading: {
      type: Boolean,
      default: false,
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
      price: "",
      positionSizeSliderValue: 0,
      isUnitChanging: false,
      eventTarget: [],
      unitTemp: "",
    };
  },
  methods: {
    changeSwitch(value) {
      this.selectedSwitch = value;
      this.price = this.selectedCoinPrice;
    },
    changePositionSlider(value) {
      let calculatePositionValue;
      if (this.text === "Buy") {
        calculatePositionValue = (this.availableQouteAsset * value) / 100;
        this.positionSizeFieldValue = String(
          parseFloat(calculatePositionValue.toFixed(8))
        );
      } else {
        const calculateUnitFieldValue = (this.availableBaseAsset * value) / 100;
        this.unitFieldValue = String(
          parseFloat(calculateUnitFieldValue.toFixed(8))
        );
      }
    },
    calculatedSlider(unitValue) {
      if (this.text === "Buy") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const calculatedSlider = parseFloat(
          (this.positionSizeFieldValue * 100) / this.availableQouteAsset
        );
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.positionSizeSliderValue =
          calculatedSlider > 100 ? 100 : calculatedSlider;
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        const calculatedSlider = parseFloat(
          (unitValue * 100) / this.availableBaseAsset
        );
        this.positionSizeSliderValue =
          calculatedSlider > 100 ? 100 : calculatedSlider;
      }
    },
  },
  computed: {
    unitFieldValue: {
      /*
      every time the manual trade form is being updated as follows:
      1. if position size get updated :
        1.a. get() method would be called
        1.b. since the position field is the starter, unit field should get calculated and updated
      2. else unit get updated:
        2.a. set() method would be called
        2.b. "unit" will push into array
        2.c. since position got updated, get() function also get a call
        2.d. if unit is already being pushed into the array then there is no need for calculation of unit and will
            return temp
        2.e. array of events gets cleared in the end.
       */
      get: function () {
        if (
          !this.positionSizeFieldValue ||
          this.positionSizeFieldValue === ""
        ) {
          return "";
        }

        if (this.eventTarget.includes("unit")) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.eventTarget = [];
          return this.unitTemp;
        }
        const calculatedUnitFieldValue = parseFloat(
          (Number(this.positionSizeFieldValue) / Number(this.price)).toFixed(8)
        );
        this.calculatedSlider(calculatedUnitFieldValue);
        return String(calculatedUnitFieldValue);
      },
      set: function (unitFieldValue) {
        if (!unitFieldValue || unitFieldValue === "") {
          return "";
        }
        this.eventTarget.push("unit");
        this.unitTemp = unitFieldValue;
        const calculatedPositionSizeFieldValue =
          Number(unitFieldValue) * Number(this.price);
        this.positionSizeFieldValue = String(
          parseFloat(calculatedPositionSizeFieldValue.toFixed(8))
        );
        this.calculatedSlider(unitFieldValue);
        this.$emit("update", Number(unitFieldValue));
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
    selectedCoinPrice(value) {
      this.price = value;
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
      class="m-t-3"
      :unit="Quote"
      v-model="price"
      :disabled="selectedSwitch === 1"
    />
    <BaseInput
      type="Number"
      label="Unit"
      :unit="Base"
      name="quantity"
      class="m-t-3"
      :unitMetadata="availableBaseAsset + ''"
      v-model="unitFieldValue"
    />
    <BaseInput
      type="Number"
      label="Position Size (Total)"
      name="Total"
      class="m-t-3"
      :unitMetadata="availableQouteAsset + ''"
      :unit="Quote"
      v-model="positionSizeFieldValue"
    />

    <v-slider
      v-model="positionSizeSliderValue"
      color="purple"
      track-color="gray"
      thumb-label="always"
      :max="100"
      :min="0"
      label=""
      @change="changePositionSlider"
    >
      <template v-slot:thumb-label="{ value }">
        <span class="ManualTrade__thumb-label">
          {{ value + "%" }}
        </span>
      </template>
    </v-slider>

    <BaseButton
      :text="text"
      class="w-1-1 m-t-3 font-body ManualTrade__submit"
    />
  </v-tab-item>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.ManualTrade {
  @include e(submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;
  }

  @include e(thumb-label) {
    color: $purple;
  }
}

::v-deep .v-slider__thumb-label {
  position: relative !important;
  bottom: -30px !important;
  background: none !important;
}
</style>
