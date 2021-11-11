<script>
import RadioButton from '@/components/button/RadioButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
export default {
  name: 'InitialConditions',
  components: {
    RadioButton,
    BaseInput,
  },
  data() {
    return {
      radioItems: [
        {
          label: 'Initial Enthalpy [J/Kg]',
          value: 'Temperature',
          name: 'initialConditionType',
          section: 'initialConditions',
        },
        {
          label: 'Enthalpy [J/Kg] ',
          value: 'Enthalpy',
          name: 'initialConditionType',
          section: 'initialConditions',
        },
      ],
      initialItem: [
        {
          label: 'Initial Saturation 1',
          name: 'initialSaturation1',
          section: 'initialConditions',
          defaultValue: this.$store.state?.config.configs.initialConditions
            .initialSaturation1,
        },
        {
          label: 'Initial Saturation 2',
          name: 'initialSaturation2',
          section: 'initialConditions',
        },
      ],
      initialEnthalpy: this.$store.state?.config.configs.initialConditions
        .value,
      selectedCondition: this.$store.state?.config.configs.initialConditions
        .InitialConditionType,
    };
  },
};
</script>

<template>
  <div>
    <BaseInput
      label="Initial Pressure [Pa]"
      name="initialPressure"
      section="initialConditions"
      default="1e7"
    />
    <RadioButton
      :items="radioItems"
      :selected="selectedCondition"
      class="m-y-4"
    />
    <BaseInput
      label="Initial Enthalpy [J/Kg]"
      name="vlaue"
      section="initialConditions"
      :default="initialEnthalpy"
    />
    <div class="InitialConditions__saturation-gird m-t-4">
      <BaseInput
        v-for="item in initialItem"
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

.InitialConditions {
  @include e(saturation-gird) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
  }
}
</style>
