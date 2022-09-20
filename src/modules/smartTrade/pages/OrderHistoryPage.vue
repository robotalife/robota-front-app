<script>
// import storage from "@/utils/storage";
import storage from "@/utils/storage";

export default {
  name: "OrderHistory",
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
        { text: "Status", value: "status" },
        { text: "Closed On", value: "closedOn" },
      ],
      openOrders: [],
      isLoading: false,
    };
  },
  computed: {
    checkExchangeListRequest() {
      return this.$store.state.exchangeListRequestStatus;
    },
    checkSelectedExchange() {
      return this.fetchOrders();
    },
  },
  watch: {
    checkExchangeListRequest(state) {
      if (state === "success") {
        this.fetchOrders();
      }
    },
    checkSelectedExchange() {
      return this.$store.getters.selectedExchange;
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
      this.isLoading = true;
      const selectedExchangeInStore = this.$store.getters.selectedExchange;
      const selectedExchange =
        selectedExchangeInStore === ""
          ? storage.getItem("selectedExchange")
          : selectedExchangeInStore;
      this.$api.smartTrade
        .fetchOrderHistory(selectedExchange)
        .then((result) => {
          this.isLoading = false;
          this.openOrders = result.orders;
          this.isOpenOrdersLoaded = true;
        })
        .catch((error) => {
          this.isLoading = false;
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
  },
};
</script>

<template>
  <div class="d-flex flex-col w-1-1">
    <div
      v-if="isOpenOrdersLoaded"
      class="h-1-1 d-flex flex-col ai-center jc-center"
    >
      <v-data-table
        :headers="headers"
        :items="openOrders"
        :items-per-page="5"
        class="elevation-1 w-1-1"
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
    <v-overlay :value="isLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
