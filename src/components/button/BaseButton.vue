<script>
// ToDo: handle event listener
import VBtn from "vuetify/lib/components/VBtn";
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "BaseButton",
  components: {
    VBtn,
    VIcon,
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
    beforeIcon: {
      type: String,
      default: "",
    },
    afterIcon: {
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
      size === 'normal' ? 'p-y-0-5' : 'p-y-1 BaseButton--small',
    ]"
    :disabled="disabled"
    depressed
  >
    <VIcon v-if="beforeIcon" class="m-r-1" dark>{{ beforeIcon }}</VIcon>
    {{ text }}
    <VIcon v-if="afterIcon" dark>{{ afterIcon }}</VIcon>
  </VBtn>
</template>

<style scope lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.BaseButton {
  border-radius: 5px;
  height: fit-content;

  @include m(small) {
    height: 40px !important;
  }
}
</style>
