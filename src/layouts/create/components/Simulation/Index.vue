<script>
import General from './components/General.vue';
import FIM from './components/FIM.vue';
export default {
  name: 'Simulation',
  components: {
    General,
    FIM,
  },
  data() {
    return {
      expandItems: [
        { label: ' Fully Implicit Method (FIM)', component: 'FIM' },
      ],
    };
  },
};
</script>

<template>
  <v-tab-item :transition="false">
    <General />
    <v-expansion-panels class="Simulation__container">
      <v-expansion-panel v-for="(item, i) in expandItems" :key="i">
        <v-expansion-panel-header
          class="Simulation__item m-0 font-16-24 g-100 fw-500"
          expand-icon="$arrowDown"
        >
          {{ item.label }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="p-x-1">
          <FIM />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-tab-item>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Simulation {
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
