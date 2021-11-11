<script>
export default {
  name: 'Tabs',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tab: 1,
    };
  },
  watch: {
    tab: function (val) {
      return this.$emit('clicked', val);
    },
  },
};
</script>

<template>
  <div class="Tabs__tab">
    <v-tabs v-model="tab">
      <v-tab
        v-for="item in items"
        :key="item.index"
        class="Tabs__tab-item p-1-5"
      >
        <p class="Tabs__tab-list d-flex ai-center jc-center font-12-16 m-b-0">
          {{ item.index }}
        </p>
        <p class="Tabs__tab-label font-14-24 m-l-1 m-b-0">{{ item.title }}</p>
      </v-tab>
    </v-tabs>
  </div>
</template>

<style scope lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Tabs {
  @include e(tab) {
    border-bottom: 1px solid $dark-blue-10;

    &-item[aria-selected='true'] {
      .Tabs__tab-list {
        color: $white;
        background-color: $primary-blue-100;
      }

      .Tabs__tab-label {
        color: $gray-100;
      }
    }

    &-list {
      height: 16px;
      width: 16px;
      background: $dark-blue-10;
      border-radius: 8px;
    }
  }
}
</style>
