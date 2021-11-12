<script>
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "LogIn",
  components: {
    VIcon,
  },
  data() {
    return {};
  },
  mounted: function () {
    this.$nextTick(function () {
      document.querySelector(".vtk").classList.add("d-hidden");
      document.querySelector(".vtk").nextSibling.classList.add("d-hidden");
    });
  },
  methods: {},
};
</script>
<template>
  <main class="Auth d-flex ai-center jc-center">
    <div class="Auth__card p-5 bg-white">
      <div class="d-flex ai-center">
        <VIcon size="32" dark>$darsim</VIcon>
        <span class="g-100 font-18-24 fw-500 m-l-1">Darsim</span>
      </div>
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.Auth {
  background-color: #f1f2f4;
  height: 100%;
  // max-height: 92vh;

  @include e(card) {
    border-radius: 10px;
    width: 464px;
    min-height: fit-content;
  }
}
</style>
