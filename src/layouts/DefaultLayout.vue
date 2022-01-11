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
    <div class="d-flex w-1-1 h-1-1">
      <SideBar />
      <RouterView />
    </div>
  </div>
</template>
