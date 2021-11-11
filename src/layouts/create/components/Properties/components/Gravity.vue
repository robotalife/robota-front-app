<script>
export default {
  name: 'Gravity',
  data() {
    return {
      Gravity: this.$store.state?.config.configs.gravity.customGravity,
    };
  },
  watch: {
    Gravity: function () {
      const collection = {
        gravity: {
          customGravity: this.Gravity,
        },
      };
      this.$store.commit('SET_SAVE_CONFIG', collection);
    },
  },
};
</script>

<template>
  <div class="Gravity d-flex ai-start jc-between">
    <p class="g-100 font-14-24 m-b-0">Gravity</p>
    <v-switch
      v-model="Gravity"
      class="m-0 p-0 Gravity__switch"
      inset
    ></v-switch>
  </div>
</template>
<style scoped lang="scss">
@import '@/styles/global/color';
@import '@/styles/utils/bem';
.Gravity {
  @include e(switch) {
    max-height: 30px;
  }
}
</style>
