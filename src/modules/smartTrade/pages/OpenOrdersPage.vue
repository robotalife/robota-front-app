<script>
// import storage from "@/utils/storage";
export default {
  name: "OpenOrders",
  components: {},
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      isOpenOrdersLoaded: false,
      headers: [
        {
          text: "Pair",
          align: "start",
          sortable: true,
          value: "pair",
        },
        { text: "Volume", value: "volume", sortable: true },
        { text: "Side", value: "side", sortable: true },
        { text: "Type", value: "type" },
        // { text: "Source", value: "source" },
        { text: "Creation date", value: "creationDate" },
        { text: "Action" },
      ],
      openOrders: [],
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      if (state === "success") {
        this.fetchOrders();
      }
    },
  },
  created() {
    const exchangeListCurrentStatus = this.$store.state
      .exchangeListRequestStatus;
    if (exchangeListCurrentStatus === "success") {
      this.fetchOrders();
    }
  },
  methods: {
    fetchOrders() {
      const selectedExchange = this.$store.getters.selectedExchange;
      this.$api.smartTrade
        .fetchOpenOrders(selectedExchange)
        .then((result) => {
          console.log(result);
          this.openOrders = result.openOrders;
          this.isOpenOrdersLoaded = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
  },
};
</script>

<template>
  <div class="d-flex w-1-1 flex-col">
    <div
      v-if="isOpenOrdersLoaded"
      class="h-1-1 d-flex flex-col ai-center jc-start"
    >
      <v-data-table
        :headers="headers"
        :items="openOrders"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
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

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
