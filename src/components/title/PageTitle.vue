<script>
export default {
  name: "PageTitle",
  props: {
    text: {
      type: String,
      default: "Title Goes Here",
    },
  },
  data() {
    return {};
  },
};
</script>
<template>
  <p class="brand-purple font-h-1 fw-700 m-b-3">{{ text }}</p>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.PageTitle {
}
</style>
