<script>
import VBtn from "vuetify/lib/components/VBtn";
export default {
  name: "BaseButton",
  components: {
    VBtn,
  },
  props: {
    text: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "normal",
    },
    styleType: {
      type: String,
      default: "fill",
    },
    type: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: "",
    };
  },
};
</script>

<template>
  <VBtn
    :type="type"
    :color="color"
    :class="[
      'BaseButton p-x-2 font',
      size === 'normal' ? 'p-y-1-5' : 'p-y-1 BaseButton--small',
    ]"
    :disabled="disabled"
    depressed
  >
    {{ text }}
  </VBtn>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.BaseButton {
  border-radius: 5px;
  height: 48px !important;

  @include m(small) {
    height: 40px !important;
  }
}
</style>
