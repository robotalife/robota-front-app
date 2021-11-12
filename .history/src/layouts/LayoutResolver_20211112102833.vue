<script>
export default {
  name: 'LayoutResolver',
  components: {
    DefaultLayout: () =>
      import(/* webpackChunkName: "DefaultLayout" */ '@/layouts/DefaultLayout'),
  },
  computed: {
    layout() {
      if (!this.$route?.matched.length) {
        return 'div';
      }
      return this.$route.meta?.layout || 'DefaultLayout';
    },
  },
};
</script>
<template>
  <Component :is="layout" />
</template>
