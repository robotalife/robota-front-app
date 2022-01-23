<script>
export default {
  name: "SwitchRadioGroup",
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
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      switchTab: this.selected,
    };
  },
  watch: {
    switchTab: function (val) {
      return this.$emit("clicked", val);
    },
  },
};
</script>

<template>
  <div :class="['SwitchRadioGroup', `SwitchRadioGroup--${items.length}`]">
    <p v-if="label" class="font-14-24 g-100 m-b-1">{{ label }}</p>
    <div class="SwitchRadioGroup__container">
      <v-tabs v-model="switchTab">
        <v-tab
          v-for="item in items"
          :key="item.value"
          class="SwitchRadioGroup__item"
        >
          <p class="SwitchRadioGroup__item-label font-text-small gray-3 m-b-0">
            {{ item.title }}
          </p>
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.SwitchRadioGroup {
  @include e(container) {
    padding: 2px 2px 2px 2px;
    border-radius: 16px;
    border: 2px solid $gray-10;
    max-height: 32px;
  }

  @include m(3) {
    .v-tabs-bar__content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @include m(2) {
    .v-tabs-bar__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }

  .v-tabs-slider-wrapper {
    display: none;
  }

  .theme--light.v-tabs > .v-tabs-bar {
    background-color: inherit;
  }

  &__item[aria-selected="true"] {
    border-radius: 30px;
    background-color: $brand-purple;
    max-height: 24px;

    p {
      color: $white !important;
      font-size: 12px;
      line-height: 24px;
    }
  }

  @include e(item) {
    padding-top: 2px;
    padding-bottom: 2px;
    max-height: 24px;

    &-list {
      height: 16px;
      width: 16px;
      background: $dark-blue-10;
      border-radius: 8px;
    }
  }
}
</style>
