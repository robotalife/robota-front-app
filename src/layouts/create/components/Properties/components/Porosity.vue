<script>
import SwitchRadioGroup from '@/components/switch/SwitchRadioGroup.vue';
import FileInput from '@/components/input/FileInput.vue';
import BaseInput from '@/components/input/BaseInput.vue';
export default {
  name: 'Porosity',
  components: {
    SwitchRadioGroup,
    FileInput,
    BaseInput,
  },
  data() {
    return {
      setPropertiesItems: [
        { title: 'Manually', value: 'manually' },
        { title: 'From File', value: 'file' },
      ],
      porosityLabel: '0 < Porosity < 1',
      switchGroup: 0,
      prosityValue: this.$store.state?.config.configs.porosity.value,
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
    <div class="d-flex jc-between ai-center">
      <p class="font-14-24 g-100 m-0">Set Porosity</p>
      <SwitchRadioGroup :items="setPropertiesItems" @clicked="changedSwitch" />
    </div>
    <v-tabs-items v-model="switchGroup">
      <v-tab-item :transition="false">
        <div class="m-t-4">
          <BaseInput
            label="Porosity"
            name="value"
            section="porosity"
            :default="prosityValue"
          />
          <p class="font-12-16 g-65 m-t-0-5 m-b-0">{{ porosityLabel }}</p>
        </div>
      </v-tab-item>
      <v-tab-item :transition="false">
        <FileInput class="m-t-4" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
