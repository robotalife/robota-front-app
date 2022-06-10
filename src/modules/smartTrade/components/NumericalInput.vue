<script>
// ToDo: change input to text field
import VIcon from "vuetify/lib/components/VIcon";
import GeneralInput from "@/components/input/GeneralInput.vue";
import { validation } from "@/validation/index";
export default {
  name: "NumericalInput",
  components: {
    VIcon,
    GeneralInput,
  },
  data() {
    return {
      errorMessage: "",
      inputValue: this.value,
    };
  },
  props: {
    unit: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    unitMetadata: {
      type: String,
      default: "",
    },
    step: {
      type: String,
      default: "any",
    },
    minValue: {
      type: Number,
      default: 0,
    },
    rules: {
      type: String,
      default: "",
    },
  },
  methods: {
    validation(value) {
      if (this.rules) {
        const validationFunction = validation[this.rules];
        let validationResult = validationFunction(value);
        this.errorMessage = validationResult;
        this.$emit("validate", {
          validationStatus: validationResult === true,
          fieldName: this.name,
        });
        this.inputValue = value;
      }
    },
  },
  watch: {
    value: function (value) {
      this.inputValue = value;
    },
    inputValue: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>

<template>
  <div class="font-14-24 g-100">
    <label class="m-b-0 d-flex jc-between">
      <span>{{ label }}</span>
      <span class="d-flex" v-if="unitMetadata">
        <VIcon class="NumericalInput__metadata-icon">$portfolio</VIcon>
        {{ unitMetadata }}
      </span>
    </label>
    <div :class="['NumericalInput p-y-1 p-l-2 d-flex', { unit: 'p-r-2' }]">
      <GeneralInput
        :name="name"
        class=""
        type="Number"
        :disabled="disabled"
        :min="minValue"
        v-model="InputValue"
      />
      <span v-if="unit" class="font-14-24 g-65 p-r-2 nowrap">{{ unit }}</span>
    </div>
    <span v-if="errorMessage.length" class="tomato-red m-t-0-5">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.NumericalInput {
  border-radius: 5px;
  border: solid 1px $dark-blue-20;
  max-height: 40px !important;

  &:focus-within {
    border-color: $primary-blue-100 !important;
  }

  &:hover {
    border-color: $gray-50;
  }

  .disabled {
    border: solid 1px $dark-blue-20;
    background-color: $dark-blue-05;
  }

  @include e(metadata-icon) {
    > svg {
      height: 14px;
    }
  }
}
</style>
