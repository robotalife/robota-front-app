<script>
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'Relative',
  components: {
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      manualItems: [
        {
          label: 'Sr,w',
          name: 'srwRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.srwRelperm,
        },
        {
          label: 'Sr,nw',
          name: 'srnwRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.srnwRelperm,
        },
        {
          label: 'Kr,e,w',
          name: 'krewRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.krewRelperm,
        },
        {
          label: 'Kr,e,nw',
          name: 'krenwRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.krenwRelperm,
        },
        {
          label: 'Wetting phase',
          name: 'wettingPhaseRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.wettingPhaseRelperm,
        },
        {
          label: 'non-Wetting phase',
          name: 'nonWettingPhaseRelperm',
          section: 'relativePermeabilityFunctions',
          defaultValue: this.$store.state?.config.configs
            .relativePermeabilityFunctions.nonWettingPhaseRelperm,
        },
      ],
      unitItems: [
        { text: 'Linear', value: 'Linear' },
        { text: 'Quadratic', value: 'Quadratic' },
        { text: 'Brooks-Corey', value: 'Corey' },
      ],
      selectedRelperm: this.$store.state?.config.configs
        .relativePermeabilityFunctions.funcName,
    };
  },
};
</script>

<template>
  <div class="d-flex flex-col w-1-1">
    <p class="font-14-24 g-100 m-b-1">RELPERM Function</p>
    <BaseSelect
      :items="unitItems"
      :selected="selectedRelperm"
      name="funcName"
      section="relativePermeabilityFunctions"
    />
    <div class="Relative__manual m-t-1">
      <BaseInput
        v-for="item in manualItems"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :section="item.section"
        :default="item.defaultValue"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Relative {
  @include e(manual) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 32px;
  }
}
</style>
