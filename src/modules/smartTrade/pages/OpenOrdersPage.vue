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
      confirmationModal: false,
      selectedOrderId: "",
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
    deleteConfirmation(id) {
      this.selectedOrderId = id;
      this.confirmationModal = true;
    },
    deleteOrder() {
      this.isLoading = true;
      this.$api.smartTrade
        .deleteOpenOrder(this.selectedOrderId)
        .then(() => {
          this.fetchOrders();
          this.isLoading = false;
          this.confirmationModal = false;
          this.snackbar = true;
          this.snackbarColor = "green";
          this.errorMessage = `order deleted successfully`;
        })
        .catch(() => {
          this.isLoading = false;
          this.confirmationModal = false;
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
          <div @click="deleteConfirmation(item.id)">
            <BaseButton
              beforeIcon="$cross"
              class="bg-tomato-red"
              :isLoading="isLoading"
            />
          </div>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="confirmationModal" width="400" height="327">
      <div class="p-3 bg-white OpenOrders__confirmation">
        <VIcon size="48" dark>$alert</VIcon>
        <p class="gray-2 m-t-2 font-h-5 fw-500">
          Are you sure you want to cancel the trade?
        </p>
        <div>
          <div class="">
            <p>This action will:</p>
            <ul>
              <li>Cancel the Robotalife trade Cancel unfilled</li>
              <li>
                orders Buys and sales for already filled orders will be saved on
              </li>
              <li>your exchange account!</li>
            </ul>
          </div>
        </div>
        <div class="d-flex jc-between m-t-7">
          <div @click="confirmationModal = false" class="w-1-2">
            <BaseButton
              text="Cancel"
              class="OpenOrders__confirmation-btn m-t-2 w-1-1"
            />
          </div>
          <div @click="deleteOrder" class="w-1-2 m-l-1">
            <BaseButton
              text="Confirm"
              :isLoading="isLoading"
              class="OpenOrders__confirmation-btn OpenOrders__confirmation-btn--confirm bg-purple m-t-2 w-1-1"
            />
          </div>
        </div>
      </div>
    </v-dialog>
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

.OpenOrders {
  @include e(confirmation) {
    border-radius: 12px;

    &-btn {
      border-radius: 32px;

      @include m(confirm) {
        color: $white;
        background: #7f56d9;
      }
    }
  }
}

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .Users__header-item-title {
    color: gray !important;
  }
}
</style>
