<script>
export default {
  name: "Tabs",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tab: 0,
    };
  },
  watch: {
    tab: function (val) {
      return this.$emit("clicked", val);
    },
  },
};
</script>

<template>
  <div class="Tabs__tab">
    <v-tabs v-model="tab">
      <v-tab v-for="item in items" :key="item.index" class="Tabs__tab-item">
        <p class="Tabs__tab-label font-14-24 m-b-0">{{ item.title }}</p>
      </v-tab>
    </v-tabs>
  </div>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Tabs {
  @include e(tab) {
    border-bottom: 1px solid $dark-blue-10;

    &-item[aria-selected="true"] {
      .Tabs__tab-list {
        color: $white;
        background-color: $primary-blue-100;
      }

      .Tabs__tab-label {
        color: $gray-3;
      }
    }

    &-label {
      color: $gray-3;
      // font-size: 16px;
      // line-height: 24px;
      // font-weight: 700;
    }

    &-item {
      padding: 0px !important;
    }

    &-list {
      height: 16px;
      width: 16px;
      background-image: $horizental;
      border-radius: 8px;
    }
  }
}

.v-tabs-slider {
  background-image: $horizental;
  height: 4px !important;
  border-radius: 2px;
}

.v-slide-group__prev,
.v-slide-group__next {
  display: none !important;
}
</style>
