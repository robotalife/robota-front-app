<script>
// ToDo: change input to text field
import VIcon from "vuetify/lib/components/VIcon";
import { validation } from "@/validation/index";
export default {
  name: "BaseInput",
  components: {
    VIcon,
  },
  data() {
    return {
      errorMessage: "",
      inputValue: this.value,
    };
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
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
    section: {
      type: String,
      default: "",
    },
    next: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    type: {
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
    isHorizontal: {
      type: Boolean,
      default: false,
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
    siblingData: {
      type: String,
      default: "",
    },
  },
  methods: {
    validation(value) {
      if (this.rules) {
        const validationFunction = validation[this.rules];
        let validationResult;
        if (this.rules === "repeatPassword") {
          validationResult = validationFunction(value, this.siblingData);
        } else {
          validationResult = validationFunction(value);
        }
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
    siblingData: function (value) {
      this.validation(this.inputValue, value);
    },
    value: function (value) {
      this.inputValue = value;
    },
  },
};
</script>

<template>
  <div :class="['font-14-24 g-100', isHorizontal ? 'd-flex' : '']">
    <label :class="['m-b-0 d-flex jc-between', isHorizontal ? 'm-r-5' : '']">
      <span :class="[isHorizontal ? 'd-flex ai-center' : '']">{{ label }}</span>
      <span class="d-flex" v-if="unitMetadata">
        <VIcon class="BaseInput__metadata-icon">$portfolio</VIcon>
        {{ unitMetadata }}
      </span>
    </label>
    <div
      :class="[
        'BaseInput p-y-1 p-l-2 d-flex',
        { icon: 'p-r-0-5', unit: 'p-r-2' },
      ]"
    >
      <input
        :value="inputValue"
        :placeholder="placeholder"
        :name="name"
        class="w-1-1"
        :data-section="section"
        :data-next="next"
        :type="type"
        :disabled="disabled"
        :step="step"
        :min="minValue"
        @input="
          (e) => {
            validation(e.target.value);
            $emit('input', e.target.value);
          }
        "
      />
      <VIcon v-if="icon" dark>{{ icon }}</VIcon>
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

.BaseInput {
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
