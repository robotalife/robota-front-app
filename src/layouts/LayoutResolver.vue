<script>
export default {
  name: "LayoutResolver",
  components: {
    DefaultLayout: () =>
      import(/* webpackChunkName: "DefaultLayout" */ "@/layouts/DefaultLayout"),
  },
  computed: {
    layout() {
      if (!this.$route?.matched.length) {
        return "div";
      }
      return this.$route.meta?.layout;
    },
  },
};
</script>
<template>
  <DefaultLayout v-if="this.$route.meta.requiresAuth">
    <Component :is="layout" />
  </DefaultLayout>
  <Component v-else :is="layout" />
</template>
