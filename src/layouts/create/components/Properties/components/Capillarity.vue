<script>
import BaseSelect from '@/components/select/BaseSelect.vue';
export default {
  name: 'Capillarity',
  components: {
    BaseSelect,
  },
  data() {
    return {
      Capillarity: this.$store.state?.config.configs.capillarity
        .capillaritySwitch,
      selectedCapillarity: this.$store.state?.config.configs.capillarity
        .capillarityType,
      capillarityType: [
        {
          text: 'Linear',
          value: 'Linear',
        },
        {
          text: 'JLeverett',
          value: 'JLeverett',
        },
        {
          text: 'BrooksCorey',
          value: 'BrooksCorey',
        },
        {
          text: 'Table',
          value: 'Table',
        },
      ],
    };
  },
  watch: {
    Capillarity: function () {
      const collection = {
        capillarity: {
          capillaritySwitch: this.Capillarity,
        },
      };
      this.$store.commit('SET_SAVE_CONFIG', collection);
    },
  },
};
</script>

<template>
  <div class="d-flex flex-col">
    <div class="Capillarity d-flex ai-start jc-between">
      <p class="g-100 font-14-24 m-b-0">Capillarity</p>
      <v-switch
        v-model="Capillarity"
        class="m-0 p-0 Capillarity__switch"
        inset
      ></v-switch>
    </div>
    <p class="font-14-24 g-100 m-t-4 m-b-1">Capillarity Type</p>
    <BaseSelect
      :items="capillarityType"
      :selected="selectedCapillarity"
      name="capillarityType"
      section="capillarity"
    />
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';
.Capillarity {
  @include e(switch) {
    max-height: 30px;
  }
}
</style>
