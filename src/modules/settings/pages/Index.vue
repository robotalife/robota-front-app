<script>
import Header from "./Header.vue";
export default {
  name: "Index",
  components: {
    Header,
  },
};
</script>

<template>
  <div class="h-1-1">
    <Header />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.Dashboard {
  background-color: #f1f2f4;
  max-height: 92vh;

  @include e(btn) {
    &-cancel {
      background-color: $white !important;
      border: 1px solid $dark-blue-20;
      color: $gray-100;
    }

    @include m(white) {
      color: $white;
    }
  }

  @include e(status) {
    height: 10px;
    width: 10px;
    border-radius: 10px;

    @include m(Completed) {
      background-color: $success;
    }

    @include m(Running) {
      background-color: $primary-blue-100;
    }

    @include m(Pending) {
      background-color: $warning;
    }

    @include m(Canceled) {
      background-color: $error;
    }
  }

  @include e(card) {
    border-radius: 10px;
    max-height: 188px;
    min-width: 170px;
    cursor: pointer;

    &-title {
      color: $white;
    }

    &:hover {
      border: 1px solid $primary-blue-100;
    }

    &-icon {
      transform: rotate(45deg);
    }
  }

  @include e(more) {
    width: 32px;
    height: 32px;
    padding: 4px;
  }
}
</style>
