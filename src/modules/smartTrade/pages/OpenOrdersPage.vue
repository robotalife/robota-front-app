<script>
// import storage from "@/utils/storage";
import BaseButton from "@/components/button/BaseButton";
export default {
  name: "OpenOrders",
  components: {
    BaseButton,
  },
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
        { text: "Action", value: "action" },
      ],
      openOrders: [],
      isLoading: false,
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
          this.openOrders = result.openOrders;
          this.isOpenOrdersLoaded = true;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    deleteOrder(id) {
      this.isLoading = true;
      this.$api.smartTrade
        .deleteOpenOrder(id)
        .then(() => {
          this.fetchOrders();
          this.isLoading = false;
          this.snackbar = true;
          this.snackbarColor = "green";
          this.errorMessage = `order deleted successfully`;
        })
        .catch(() => {
          this.isLoading = false;
          this.snackbar = true;
          this.snackbarColor = "pink";
          this.errorMessage =
            "There is a problem with the service, please try again later.";
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
        class="elevation-1 w-1-1"
      >
        <template v-slot:item.action="{ item }">
          <div @click="deleteOrder(item.id)">
            <BaseButton
              beforeIcon="$cross"
              class="bg-tomato-red"
              :isLoading="isLoading"
            />
          </div>
        </template>
      </v-data-table>
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

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
