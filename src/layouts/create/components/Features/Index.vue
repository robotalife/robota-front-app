<script>
import Wells from './components/Wells.vue';
import Fractures from './components/Fractures.vue';
export default {
  name: 'Features',
  components: {
    Wells,
    Fractures,
  },
  data() {
    return {
      expandItems: [
        { label: 'Wells', component: 'Wells' },
        { label: 'Fractures', component: 'Fractures' },
      ],
    };
  },
  methods: {
    changedSwitch(value) {
      this.switchGroup = value;
    },
  },
};
</script>

<template>
  <v-tab-item :transition="false">
    <v-expansion-panels class="Properties__container">
      <v-expansion-panel v-for="(item, i) in expandItems" :key="i">
        <v-expansion-panel-header
          class="Properties__item m-0 font-16-24 g-100 fw-500"
          expand-icon="$arrowDown"
        >
          {{ item.label }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="p-x-1">
          <Wells v-if="item.component === 'Wells'" />
          <Fractures v-if="item.component === 'Fractures'" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-tab-item>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Properties {
  @include e(container) {
    .v-expansion-panel {
      margin: 0px;
    }
  }
  @include e(item) {
    max-height: 40px;
    min-height: 40px !important;
    margin: 0 0 32px;
    padding: 8px 32px;
    box-shadow: inset 0 -1px 0 0 $dark-blue-05, inset 0 1px 0 0 $dark-blue-05;
    background-color: $dark-blue-05;
  }

  @include e(expand-container) {
    &:only-child.v-expansion-panel-content__wrap {
      padding: 0px !important;
    }
  }
}
</style>
