<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import FileInput from '@/components/input/FileInput.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'Permeability',
  components: {
    SwitchRadioGroup,
    FileInput,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      unitItems: [
        { text: 'm2', value: 'M2' },
        { text: 'D', value: 'D' },
        { text: 'mD', value: 'mD' },
        { text: 'log(m2)', value: 'log_m2' },
        { text: 'log(D)', value: 'log_D' },
        { text: 'log(mD)', value: 'log_mD' },
      ],
      manualItems: [
        {
          label: 'Permeability',
          name: 'x',
          unit: 'kxx',
          section: 'permeability',
          secondLayer: 'point',
          defaultValue: this.$store.state?.config.configs.permeability.point.x,
        },
        {
          label: '',
          name: 'y',
          unit: 'kyy',
          section: 'permeability',
          secondLayer: 'point',
          defaultValue: this.$store.state?.config.configs.permeability.point.y,
        },
        {
          label: '',
          name: 'z',
          unit: 'kzz',
          section: 'permeability',
          secondLayer: 'point',
          defaultValue: this.$store.state?.config.configs.permeability.point.z,
        },
      ],
      avarage: this.$store.state?.config.configs.permeability
        .averagePermeabilityAndContrast,
      switchGroup: 0,
      selectedUnit: this.$store.state?.config.configs.permeability
        .permeabilityUnit,
    };
  },
  watch: {
    avarage: function () {
      const collection = {
        permeability: {
          averagePermeabilityAndContrast: this.avarage,
        },
      };
      this.$store.commit('SET_SAVE_CONFIG', collection);
    },
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
    <p class="font-14-24 g-100 m-b-1">Permeability Unit</p>
    <BaseSelect
      :items="unitItems"
      :selected="selectedUnit"
      name="permeabilityUnit"
      section="permeability"
    />
    <div class="p-t-1 d-flex jc-between ai-center">
      <p class="font-14-24 g-100 m-0">Set Properties</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <div class="Permeability__manual m-t-4">
          <BaseInput
            v-for="item in manualItems"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :unit="item.unit"
            :next="item.secondLayer"
            :section="item.section"
            :default="item.defaultValue"
          />
        </div>
        <hr class="m-y-4" />
        <div class="d-flex ai-start jc-between">
          <p class="g-100 font-14-24">
            Declare Average Permeability and Contrast
          </p>
          <v-switch v-model="avarage" class="m-0" inset></v-switch>
        </div>
      </v-tab-item>
      <v-tab-item :transition="false">
        <FileInput class="m-t-4" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Permeability {
  @include e(manual) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;

    label:nth-child(n) {
      margin-top: 24px;
    }

    label:first-child {
      margin-top: 0px;
    }
  }
}
</style>
