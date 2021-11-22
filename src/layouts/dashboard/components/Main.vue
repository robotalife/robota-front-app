<script>
import storage from "@/utils/storage";
export default {
  name: "Main",
  components: {},
  data() {
    return {
      snackbar: false,
      dialog2: false,
      errorMessage: "",
      snackbarColor: "pink",
      projectList: null,
      modelTitle: "",
      loading: false,
      outputProjects: [],
      changePasswordDialog: false,
      exChangeList: this.$store.state.exChangeList,
      userPassword: {
        currentPassword: "",
        newPassword: "",
      },
    };
  },
  mounted: function () {},
  created() {
    this.getUserExchanges();
  },
  methods: {
    logout() {
      storage.removeItem("token");
      storage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    getUserExchanges() {
      this.$api.exchange
        .fetchExchangeList(storage.getItem("user")?.id)
        .then((result) => {
          this.fetchedData = true;
          let customerExchangeList = result.exchanges;
          this.$store.commit("SET_EXCHANGE_LIST", customerExchangeList);
          if (customerExchangeList.length === 0) {
            this.$router.push({ name: "settings" });
          }
        })
        .catch(() => {
          this.fetchedData = true;
        });
    },
  },
};
</script>

<template>
  <div class="h-1-1">
    <div class="Dashboard h-1-1 d-flex ai-center jc-center">Dashboard</div>
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
