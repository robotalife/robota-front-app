<script>
// ToDo: change input to text field
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "BaseInput",
  components: {
    VIcon,
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
    default: {
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
  },
  data() {
    return {
      value: this.default,
    };
  },
  methods: {
    changeValue() {
      return this.$emit("changed", this.value);
    },
  },
};
</script>

<template>
  <label class="font-14-24 g-100">
    {{ label }}
    <div
      :class="[
        'BaseInput p-y-1 p-l-2 d-flex m-t-1',
        { icon: 'p-r-0-5', unit: 'p-r-2' },
      ]"
    >
      <input
        v-model="value"
        :placeholder="placeholder"
        :name="name"
        class="w-1-1"
        :data-section="section"
        :data-next="next"
        :type="type"
        :disabled="disabled"
        @keyup="changeValue"
      />
      <VIcon v-if="icon" dark>{{ icon }}</VIcon>
      <span v-if="unit" class="font-14-24 g-65 p-r-2 nowrap">{{ unit }}</span>
    </div>
  </label>
</template>

<style scope lang="scss">
@import "@/styles/global/color";

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
}
</style>
