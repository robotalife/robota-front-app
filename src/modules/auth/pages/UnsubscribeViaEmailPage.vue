<script>
export default {
  name: "UnsubscribeViaEmail",
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.unsubscribe();
  },
  methods: {
    unsubscribe() {
      this.loaded = true;
      this.$api.auth
        .unsubscribeViaEmail(this.$route.query.data)
        .then(() => {
          this.message = "You have been unsubscribed from marketing emails.";
        })
        .catch((error) => {
          this.message = error?.response?.data.message;
        });
    },
  },
};
</script>
<template>
  <div class="h-1-1 w-1-1 d-flex items-center jc-center">{{ message }}</div>
</template>

<style scoped lang="scss"></style>
