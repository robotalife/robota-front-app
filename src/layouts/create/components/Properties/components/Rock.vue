<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
import FileInput from '@/components/input/FileInput.vue';
export default {
  name: 'Rock',
  components: {
    SwitchRadioGroup,
    BaseInput,
    FileInput,
    BaseSelect,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      rockType: [
        {
          text: 'Sandstone',
          value: 'Sandstone',
        },
        {
          text: 'Carbonate',
          value: 'Carbonate',
        },
        {
          text: 'Limestone',
          value: 'Limestone',
        },
        {
          text: 'Shale',
          value: 'Shale',
        },
      ],
      selectedRockType: this.$store.state?.config.configs.rock.name,
      rockInputs: [
        {
          label: 'Rock Density [kg/m^3]',
          name: 'density',
          section: 'rock',
          defaultValue: this.$store.state?.config.configs.rock.density,
        },
        {
          label: 'Rock Compressibility [1/Pa]',
          name: 'compressibility',
          section: 'rock',
          defaultValue: this.$store.state?.config.configs.rock.compressibility,
        },
        {
          label: 'Rock Heat Conductivity [W/m/K]',
          name: 'heatConductivity',
          section: 'rock',
          defaultValue: this.$store.state?.config.configs.rock.heatConductivity,
        },
        {
          label: 'Rock Specific Heat [J/Kg/K]',
          name: 'specificHeat',
          section: 'rock',
          defaultValue: this.$store.state?.config.configs.rock.specificHeat,
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
  <div class="d-flex flex-col w-1-1">
    <div class="p-t-1 d-flex jc-between ai-center m-b-4">
      <p class="font-14-24 g-100 m-0">Number of phases</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <p class="font-14-24 g-100 m-b-1">Rock Type</p>
        <BaseSelect
          :items="rockType"
          :selected="selectedRockType"
          name="name"
          section="rock"
        />
        <div class="Rock__inputs-container">
          <BaseInput
            v-for="item in rockInputs"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :section="item.section"
            :default="item.defaultValue"
          />
        </div>
      </v-tab-item>
      <v-tab-item :transition="false">
        <FileInput />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Rock {
  @include e(inputs-container) {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 32px;
  }
}
</style>
