<script>
export default {
  name: "RadioButton",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
      radioGroup: this.selected,
    };
  },
};
</script>

<template>
  <div class="d-flex">
    <label v-for="item in items" :key="item.value" class="m-r-7 m-t-1 d-flex">
      <div class="RadioButton d-flex jc-center ai-center">
        <input
          v-model="radioGroup"
          :value="item.value"
          type="radio"
          :name="item.name"
          :data-section="item.section"
        />
      </div>
      <span class="font-14-24 g-100 m-l-1">{{ item.label }}</span>
    </label>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.RadioButton {
  border: 1px solid $gray-30;
  border-radius: 10px;
  width: 21px;
  height: 21px;

  > input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 10px;
    width: 20px;
    height: 19px;
    transition: 0.2s all linear;

    &:checked {
      border: 6px solid $white;
      background-color: $primary-blue-100;
    }
  }
}
</style>
