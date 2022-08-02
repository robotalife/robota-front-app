<script>
export default {
  name: "Activate",
  data() {
    return {
      errorMessage: "",
    };
  },
  created() {
    this.activateUser();
  },
  methods: {
    activateUser() {
      this.$api.auth
        .activateUser(this.$route.query.key)
        .then(() => {
          this.$router.push({ name: "signIn" });
        })
        .catch((error) => {
          this.errorMessage = error?.response?.data.message;
        });
    },
  },
};
</script>
<template>
  <div class="h-1-1 w-1-1 d-flex items-center jc-center">
    {{ errorMessage }}
  </div>
</template>

<style scoped lang="scss"></style>
