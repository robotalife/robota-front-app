<script>
import { renderObject } from '@/layouts/create/components/sampleSimulation';
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import RadioButton from '@/components/button/RadioButton.vue';
import FileInput from '@/components/input/FileInput.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'Domain',
  components: {
    SwitchRadioGroup,
    RadioButton,
    FileInput,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      switchItems: [
        { title: 'Files', value: 'files' },
        { title: 'Values', value: 'values' },
        { title: 'Template', value: 'template' },
      ],
      switchItemsLabel: 'Select Domain From',
      switchGroup: 0,
      radioItems: [
        { label: 'Corner Point Grid', value: 'point' },
        { label: 'Cartesian', value: 'cartesian' },
      ],
      valuesItem: [
        {
          label: 'Length x (m)',
          name: 'lenX',
          section: 'domain',
          defaultValue: this.$store.state?.config?.configs?.domain?.lenX,
        },
        {
          label: 'Length y (m)',
          name: 'lenY',
          section: 'domain',
          defaultValue: this.$store.state?.config.configs.domain.lenY,
        },
        {
          label: 'Length z (m)',
          name: 'lenZ',
          section: 'domain',
          defaultValue: this.$store.state?.config.configs.domain.lenZ,
        },
        {
          label: 'Grid Cells in x',
          name: 'gridCellsX',
          section: 'domain',
          defaultValue: this.$store.state?.config.configs.domain.gridCellsX,
        },
        {
          label: 'Grid Cells in y',
          name: 'gridCellsY',
          section: 'domain',
          defaultValue: this.$store.state?.config.configs.domain.gridCellsY,
        },
        {
          label: 'Grid Cells in z',
          name: 'gridCellsZ',
          section: 'domain',
          defaultValue: this.$store.state?.config.configs.domain.gridCellsZ,
        },
      ],
      templateItems: [
        { text: 'Select domain from template', value: '' },
        { text: 'Black sea', value: 'CartesianGrid' },
        { text: 'Delft city', value: 'CartesianGrid' },
        { text: 'Paris city', value: 'CartesianGrid' },
      ],
      square: {
        xLength: 0,
        yLength: 0,
        zLength: 0,
      },
    };
  },
  created() {
    renderObject(this.square);
  },
  methods: {
    changedSwitch(value) {
      this.switchGroup = value;
    },
  },
};
</script>

<template>
  <v-tab-item :transition="false" class="p-4">
    <SwitchRadioGroup
      :items="switchItems"
      :label="switchItemsLabel"
      class="w-1-1"
      @clicked="changedSwitch"
    />
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <RadioButton
          :items="radioItems"
          :selected="radioItems[0].value"
          class="m-t-4"
        />
        <FileInput
          id="domain-file"
          class="m-t-4"
          name="filename"
          section="domain"
        />
      </v-tab-item>
      <v-tab-item :transition="false">
        <div class="m-t-4 d-flex jc-between">
          <p class="font-14-24 g-100">Grid Discretization:</p>
          <p class="font-14-24 g-100 fw-500">Cartesian Grid</p>
        </div>
        <form class="Domain__cartesian-gird m-t-4">
          <BaseInput
            v-for="item in valuesItem"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            :section="item.section"
            :default="item.defaultValue"
          />
        </form>
      </v-tab-item>
      <v-tab-item :transition="false">
        <div class="m-y-4 d-flex jc-between">
          <p class="font-14-24 g-100">Grid Discretization:</p>
          <p class="font-14-24 g-100 fw-500">Cartesian Grid</p>
        </div>
        <BaseSelect
          :items="templateItems"
          :selected="templateItems[1].text"
          name="gridDiscretization"
          section="domain"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-tab-item>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Domain {
  @include e(cartesian-gird) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 32px;
  }
}
</style>
