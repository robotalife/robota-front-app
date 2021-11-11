<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import FileInput from '@/components/input/FileInput.vue';
import Permeability from './components/Permeability.vue';
import Relative from './components/Relative.vue';
import Porosity from './components/Porosity.vue';
import Gravity from './components/Gravity.vue';
import Phase from './components/Phase.vue';
import Rock from './components/Rock.vue';
import Capillarity from './components/Capillarity.vue';
import InitialConditions from './components/InitialConditions.vue';
export default {
  name: 'Properties',
  components: {
    SwitchRadioGroup,
    FileInput,
    Permeability,
    Relative,
    Porosity,
    Gravity,
    Phase,
    Rock,
    Capillarity,
    InitialConditions,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      switchGroup: 0,
      expandItems: [
        { label: 'Permeability', component: 'Permeability' },
        { label: 'Capillarity', component: 'Capillarity' },
        {
          label: 'Relative Permeability Functions',
          component: 'Relative',
        },
        { label: 'Porosity', component: 'Porosity' },
        { label: 'Gravity', component: 'Gravity' },
        { label: 'Phase Properties', component: 'Phase' },
        { label: 'Rock Properties', component: 'Rock' },
        { label: 'Initial conditions', component: 'InitialConditions' },
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
    <div class="p-4 d-flex jc-between ai-center">
      <p class="font-14-24 g-100 m-0">Set Properties</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
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
              <Permeability v-if="item.component === 'Permeability'" />
              <Relative v-else-if="item.component === 'Relative'" />
              <Porosity v-else-if="item.component === 'Porosity'" />
              <Gravity v-else-if="item.component === 'Gravity'" />
              <Phase v-else-if="item.component === 'Phase'" />
              <Rock v-else-if="item.component === 'Rock'" />
              <Capillarity v-else-if="item.component === 'Capillarity'" />
              <InitialConditions
                v-else-if="item.component === 'InitialConditions'"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>
      <v-tab-item :transition="false" class="p-x-4">
        <FileInput />
      </v-tab-item>
    </v-tabs-items>
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
