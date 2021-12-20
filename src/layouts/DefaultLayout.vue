<script>
import storage from "@/utils/storage";
import Header from "@/components/shared/Header.vue";
export default {
  name: "DefaultLayout",
  components: { Header },
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
    <RouterView />
  </div>
</template>
