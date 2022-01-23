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
  mounted: function () {},
  methods: {},
};
</script>
<template>
  <main class="Auth d-flex flex-col ai-center jc-center">
    <VIcon dark class="Auth__logo">$robotaLogo</VIcon>
    <div class="Auth__card m-t-12 p-8 bg-white">
      <!-- <div class="d-flex ai-center"> -->
      <!-- <VIcon size="32" dark>$darsim</VIcon> -->
      <!-- <span class="g-100 font-18-24 fw-500 m-l-1">Robota</span> -->
      <!-- </div> -->
      <RouterView />
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.Auth {
  background-color: $gray-11;
  height: 100%;
  background-image: url("../../../assets/svg/authBackground.svg");
  background-repeat: no-repeat;
  background-position: center;

  @include e(card) {
    width: 464px;
    min-height: fit-content;
    box-shadow: 0 4px 18px rgba(25, 25, 35, 0.05);
    border-radius: 8px;
  }

  @include e(logo) {
    ::v-deep .v-icon__component {
      width: 185px !important;
      height: 42px !important;
    }
  }
}
</style>
