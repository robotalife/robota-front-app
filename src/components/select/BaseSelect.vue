<script>
export default {
  name: "BaseSelect",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "",
    },
    selected: {
      type: String,
      default: "Select a template",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      select: this.selected,
    };
  },
  watch: {
    select: function () {
      return this.$emit("changed", this.select);
    },
  },
};
</script>

<template>
  <label class="BaseSelect font-14-24 g-100">
    {{ label }}
    <v-select
      v-model="select"
      :items="items"
      :label="selected"
      :name="name"
      dense
      solo
      append-icon="$arrowDown"
    ></v-select>
  </label>
</template>

<style scope lang="scss">
@import "@/styles/global/color";

.BaseSelect {
  .v-input__slot {
    box-shadow: none !important;
    border-radius: 5px;
    border: solid 1px $dark-blue-20;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    max-height: 40px;
  }

  .v-select__selections {
    max-height: min-content !important;

    > input {
      padding: 0 !important;
    }
  }
}
</style>
