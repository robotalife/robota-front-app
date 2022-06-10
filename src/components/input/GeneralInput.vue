<script>
// ToDo: change input to text field
export default {
  name: "GeneralInput",
  data() {},
  props: {
    placeholder: {
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
    type: {
      type: String,
      default: "",
    },
    disabled: {
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
  },
};
</script>

<template>
  <input
    :value="value"
    :placeholder="placeholder"
    :name="name"
    class="w-1-1"
    :type="type"
    :disabled="disabled"
    :step="step"
    :min="minValue"
    @input="
      (e) => {
        $emit('input', e.target.value);
      }
    "
  />
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
</style>
