<script>
export default {
  name: "Activate",
  data() {
    return {
      errorMessage: "",
    };
  },
  created() {
    console.log("Activate");
    this.activateUser();
  },
  methods: {
    activateUser() {
      this.loaded = true;
      this.$api.auth
        .activateUser(this.$route.query.key)
        .then((result) => {
          console.log(result);
          this.$router.push({ name: "signIn" });
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
        });
    },
  },
};
</script>
<template>
  <div class="h-1-1 w-1-1 d-flex ai-center jc-center">{{ errorMessage }}</div>
</template>

<style scoped lang="scss"></style>
