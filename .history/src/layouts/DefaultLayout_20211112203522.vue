<script>
import storage from "@/utils/storage";
export default {
  name: "DefaultLayout",
  created() {
    if (storage.getItem("user")) {
      this.$store.commit("SET_USER", storage.getItem("user"));
    }
  },
};
</script>

<template>
  <RouterView />
</template>
