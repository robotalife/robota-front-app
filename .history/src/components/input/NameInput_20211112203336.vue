<script>
export default {
  name: "NameInput",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: this.$store.state?.config.name,
    };
  },
  methods: {
    changeName() {
      return this.$emit("changed", this.value);
    },
  },
};
</script>

<template>
  <div class="NameInput d-flex ai-center p-x-1">
    <input
      v-model="value"
      class="font-18-24 g-100"
      :placeholder="placeholder"
      @keyup="changeName"
    />
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";

.NameInput {
  border: solid 1.5px $white;
  &,
  input {
    max-width: fit-content;
  }

  &:focus-within {
    border-radius: 3px;
    border: 1px solid $primary-blue-100 !important;
  }

  &:hover {
    border-radius: 3px;
    border: solid 1.5px $dark-blue-10;
  }
}
</style>
