<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'Phase',
  components: {
    SwitchRadioGroup,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: '1', value: '1' },
        { title: '2', value: '2' },
      ],
      phaseModels: [
        { text: 'Immiscible', value: 'Immiscible' },
        { text: 'Single Phase', value: 'SinglePhase' },
        { text: '2Phase Black Oil', value: '2PhaseBlackOil' },
        { text: '2Phase Compositional', value: '2PhaseCompositional' },
        { text: 'Geothermal Single Phase', value: 'Geothermal_SinglePhase' },
        { text: 'Geothermal 2Phase', value: 'Geothermal_2Phase' },
      ],
      selectedModel: this.$store.state?.config.configs.fluid.name,
      phase1: [
        {
          label: 'Phase Density [kg/m^3]',
          name: 'phase1Density',
          unit: 'phase1',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid.phase1Density,
        },
        {
          label: 'Phase Viscosity [Pa.sec]',
          name: 'phase1Viscosity',
          unit: 'phase1',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid.phase1Viscosity,
        },
        {
          label: 'Phase Compressibility [1/Pa]',
          name: 'phase1Compressibility',
          unit: 'phase1',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase1Compressibility,
        },
        {
          label: 'Phase Heat Conductivity [W/m/K]',
          name: 'phase1HeatConductivity',
          unit: 'phase1',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase1HeatConductivity,
        },
        {
          label: 'Phase Specific Heat [J/Kg/K]',
          name: 'phase1SpecificHeat',
          unit: 'phase1',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase1SpecificHeat,
        },
      ],
      phase2: [
        {
          label: 'Phase Density [kg/m^3]',
          name: 'phase2Density',
          unit: 'phase2',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid.phase2Density,
        },
        {
          label: 'Phase Viscosity [Pa.sec]',
          name: 'phase2Viscosity',
          unit: 'phase2',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid.phase2Viscosity,
        },
        {
          label: 'Phase Compressibility [1/Pa]',
          name: 'phase2Compressibility',
          unit: 'phase2',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase2Compressibility,
        },
        {
          label: 'Phase Heat Conductivity [W/m/K]',
          name: 'phase2HeatConductivity',
          unit: 'phase2',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase2HeatConductivity,
        },
        {
          label: 'Phase Specific Heat [J/Kg/K]',
          name: 'phase2SpecificHeat',
          unit: 'phase2',
          section: 'fluid',
          defaultValue: this.$store.state?.config.configs.fluid
            .phase2SpecificHeat,
        },
      ],
      avarage: true,
      switchGroup: 0,
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
  <div class="Permeability d-flex flex-col w-1-1">
    <p class="font-14-24 g-100 m-b-1">Phase Model</p>
    <BaseSelect
      :items="phaseModels"
      :selected="selectedModel"
      name="name"
      section="fluid"
    />
    <div class="p-t-1 d-flex jc-between ai-center m-b-4">
      <p class="font-14-24 g-100 m-0">Number of phases</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <div class="Phase__numbers-container">
          <BaseInput
            v-for="item in phase1"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :unit="item.unit"
            :section="item.section"
            :default="item.defaultValue"
          />
        </div>
      </v-tab-item>
      <v-tab-item :transition="false">
        <div class="Phase__numbers-container">
          <BaseInput
            v-for="item in phase2"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :unit="item.unit"
            :section="item.section"
            :default="item.defaultValue"
          />
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Phase {
  @include e(numbers-container) {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 32px;
  }
}
</style>
