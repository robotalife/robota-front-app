<script>
import storage from "@/utils/storage";
export default {
  name: "Main",
  components: {},
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      console.log(state, "check status");
      if (state === "success") {
        this.getUserExchanges();
      }
    },
  },
  mounted: function () {},
  methods: {
    logout() {
      storage.removeItem("token");
      storage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    getUserExchanges() {
      const exchangeList = this.$store.getters.exchangeList;
      if (!exchangeList) {
        this.$router.push({ name: "settings" });
      }
    },
  },
};
</script>

<template>
  <div class="h-1-1 w-1-1 d-flex flex-col ai-center jc-center">
    <div class="Dashboard">Dashboard</div>
    <RouterLink to="/smart-trade/trading-terminal" class="Login__reset"
      >Smart Trade</RouterLink
    >
    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
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
