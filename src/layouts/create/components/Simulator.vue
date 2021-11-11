<script>
import { simulation, renderObject } from './sampleSimulation';
//import { initLocalFileLoader } from './sampleDomainSimulation';
import BaseButton from '@/components/button/BaseButton.vue';
export default {
  name: 'Simulator',
  components: {
    BaseButton,
  },
  mounted: function () {
    // initLocalFileLoader();
    this.$nextTick(function () {
      simulation();
      // initLocalFileLoader();
      document
        .querySelector('canvas')
        .parentElement.classList.remove('d-hidden');
      document.querySelector('canvas').parentElement.classList.add('vtk');
      document
        .querySelector('canvas')
        .parentElement.nextElementSibling.remove();
    });
  },
  methods: {
    saveConfig(e) {
      e.preventDefault();
      renderObject({
        xLength: this.$store.state?.config.configs.domain.lenX,
        yLength: this.$store.state?.config.configs.domain.lenY,
        zLength: this.$store.state?.config.configs.domain.lenZ,
      });
    },
  },
};
</script>

<template>
  <div id="simulator">
    <div @click="saveConfig">
      <BaseButton
        class="Simulation__preview m-t-4 m-l-4 font-14-24"
        text="Update Preview"
        size="smal"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';

.Simulation {
  margin: 0px;
  padding: 0px;
  position: absolute;
  top: 74px;
  right: 10%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  max-width: 873px;
  max-height: 873px;

  @include e(preview) {
    background-color: $white !important;
    border-radius: 7px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.07);
    color: $gray-100;
  }
}
</style>
