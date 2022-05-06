<script>
export default {
  name: "AutoCompleteSelect",
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
  <label class="BaseSelect font-text-small gray-3 fw-500">
    <p class="m-b-0">{{ label }}</p>
    <v-autocomplete
      v-model="select"
      :items="items"
      :label="selected"
      :name="name"
      class="font-12-24"
      dense
      solo
      append-icon="$arrowDown"
    ></v-autocomplete>
  </label>
</template>

<style scope lang="scss">
@import "@/styles/global/color";

.BaseSelect {
  .v-input__slot {
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid $gray-10;
    padding-top: 8px !important;
    padding-bottom: 8px !important;
    max-height: 40px;
  }

  .v-select__slot {
    margin-bottom: 4px;
    > label {
      font-size: 12px !important;
      line-height: 24px;
      color: $gray-3 !important;
      font-weight: 400 !important;
      padding-bottom: 2px;
    }
  }

  .v-input__append-inner {
    margin-top: 7px !important;
  }

  .v-select__selections {
    max-height: min-content !important;

    > div {
      font-size: 12px !important;
      line-height: 24px;
      color: $gray-3 !important;
      font-weight: 400 !important;
    }

    > input {
      padding: 0 !important;
      font-size: 12px !important;
      line-height: 24px;
      color: $gray-3 !important;
      font-weight: 400 !important;
    }
  }
}
</style>
