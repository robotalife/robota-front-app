<script>
import storage from "@/utils/storage";
import Header from "@/components/shared/Header.vue";
import SideBar from "@/components/shared/SideBar.vue";
export default {
  name: "DefaultLayout",
  components: {
    Header,
    SideBar,
  },
  created() {
    if (storage.getItem("user")) {
      this.$store.commit("SET_USER", storage.getItem("user"));
    }
  },
};
</script>

<template>
  <div class="h-1-1">
    <Header />
    <div class="d-flex w-1-1 DefaultLayout">
      <SideBar />
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.DefaultLayout {
  max-height: 85%;
}
</style>
