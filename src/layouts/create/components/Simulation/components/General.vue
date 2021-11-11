<script>
import RadioButton from '@/components/button/RadioButton.vue';
import BaseInput from '@/components/input/BaseInput.vue';
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'General',
  components: {
    BaseInput,
    BaseSelect,
    RadioButton,
  },
  data() {
    return {
      unitItems: [
        { text: 'Day(s)', value: 'DAYS' },
        { text: 'Hour(s)', value: 'HOURS' },
        { text: 'Minute(s)', value: 'MINUTES' },
        { text: 'Second(s)', value: 'SECONDS' },
      ],
      radioItems: [
        {
          label: 'Binary',
          value: 'VTK',
          name: 'outputFormat',
          section: 'simulation',
        },
        {
          label: 'ASCII',
          value: 'ASCII',
          name: 'outputFormat',
          section: 'simulation',
        },
      ],
      simulationTime: this.$store.state?.config.configs.simulation
        .simulationTime.value,
      simulationTimeSelectedUnit: this.$store.state?.config.configs.simulation
        .simulationTime.simulationTimeUnit,
      maxTimesteps: this.$store.state?.config.configs.simulation
        .maximumTimesteps,
      reportNumber: this.$store.state?.config.configs.simulation.reportsNumber,
      minTime: this.$store.state?.config.configs.simulation.minTimestepSize,
      maxTime: this.$store.state?.config.configs.simulation.maxTimestepSize,
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
  <div class="p-4">
    <div class="d-flex">
      <BaseInput
        label="Simulation Time"
        name="value"
        section="simulation"
        next="simulationTime"
        :default="simulationTime"
      />
      <div class="m-l-2">
        <p class="font-14-24 g-100 m-b-1">Unit</p>
        <BaseSelect
          :items="unitItems"
          :selected="simulationTimeSelectedUnit"
          name="simulationTimeUnit"
          next="simulationTime"
          section="simulation"
        />
      </div>
    </div>
    <BaseInput
      label="Maximum number of Timesteps Size"
      name="maximumTimesteps"
      section="simulation"
      :default="maxTimesteps"
    />
    <br class="m-y-2" />
    <BaseInput
      label="Number of Reports"
      name="reportsNumber"
      section="simulation"
      :default="reportNumber"
    />
    <p class="font-14-24 g-100 m-t-4 m-b-1">
      Minimum & Maximum number of Timesteps
    </p>
    <div class="d-flex ai-center">
      <BaseInput name="minTimesteps" section="simulation" :default="minTime" />
      <BaseInput
        name="maxTimesteps"
        class="m-l-2"
        section="simulation"
        :default="maxTime"
      />
    </div>
    <p class="font-14-24 g-100 m-t-4 m-b-1">Format for Output VTK Files:</p>
    <RadioButton :items="radioItems" :selected="radioItems[0].value" />
  </div>
</template>
