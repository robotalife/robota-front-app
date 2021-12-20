<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import storage from "@/utils/storage";
import { constants } from "@/constant/constants";

export default {
  name: "Exchange",
  components: {
    BaseInput,
    BaseButton,
  },
  computed: {
    valuesItem() {
      return [
        {
          label: "API key",
          name: "apiKey",
        },
        {
          label: "Secret Key",
          name: "apiSecret",
        },
        {
          label: "Account Lable",
          name: "exchangeName",
        },
      ];
    },
  },
  data() {
    return {
      inputValues: {
        apiKey: "",
        apiSecret: "",
        exchangeName: "",
      },
      exchangeObj: {
        apiKey: "",
        apiSecret: "",
        exchangeName: "",
        exchangeType: "BINANCE",
        userId: storage.getItem("user").id,
      },
      exchangeList: [],
      addExchangeDialog: false,
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      userData: storage.getItem("user"),
      exchangeListKey: constants.profile.exchanges,
      deleteConfirmation: false,
      selectedExchange: null,
    };
  },
  mounted() {
    this.$api.exchange.fetchExchangeList(this.userData?.id).then((result) => {
      this.exchangeList = result.exchanges;
    });
  },
  methods: {
    changeExchangeForm(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.exchangeObj[name] = value;
    },
    // updateExchanges () {
    //   let exchanges = store.
    // },
    addExchange(e) {
      e.preventDefault();
      this.$api.exchange.addExchange(this.exchangeObj).then((result) => {
        this.userData[this.exchangeListKey].push(result);
        this.exchangeList.push(result);
        storage.setItem("exchanges", this.userData);
        this.addExchangeDialog = false;
      });
    },
    deleteExchange() {
      const id = this.selectedExchange.exchangeId;
      this.$api.exchange
        .deleteExchange(id)
        .then(() => {
          this.exchangeList.map((item, index) => {
            if (item.exchangeId === id) {
              let list = this.exchangeList;
              list.splice(index, 1);
              this.userData[this.exchangeListKey] = list;
              this.deleteConfirmation = false;
            }
          });
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
        });
    },
    openDeleteConfirmationDialog(exchange) {
      this.selectedExchange = exchange;
      this.deleteConfirmation = true;
    },
    closeDialog() {
      this.deleteConfirmation = false;
      this.selectedExchange = null;
    },
  },
};
</script>

<template>
  <v-tab-item :transition="false" class="p-4 w-1-1">
    <div
      v-for="(exchange, index) in exchangeList"
      :key="index"
      class="d-flex ai-center"
    >
      <p class="m-r-1">
        {{ exchange.exchangeName }}
      </p>
      <div
        v-if="exchangeList.length"
        @click="() => openDeleteConfirmationDialog(exchange)"
      >
        <BaseButton text="Delete Exchange" class="m-t-2" />
      </div>
    </div>
    <div @click="addExchangeDialog = true">
      <BaseButton text="Add Exchange" class="m-t-2" />
    </div>
    <v-dialog v-model="addExchangeDialog" width="550" height="600">
      <form
        class="m-t-4 p-2 bg-white"
        @submit.prevent="addExchange"
        @change="changeExchangeForm"
      >
        <BaseInput
          v-for="item in valuesItem"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          v-model="inputValues[item.name]"
        />
        <BaseButton text="Add Exchange" class="m-t-2" />
      </form>
    </v-dialog>
    <v-dialog v-model="deleteConfirmation" width="550" height="600">
      <template>
        <p>Are you sure to delete ?</p>
        <div class="d-flex jc-between">
          <div @click="deleteExchange">
            <BaseButton text="Yes" class="m-t-2" />
          </div>
          <div @click="closeDialog">
            <BaseButton text="No" class="m-t-2" />
          </div>
        </div>
      </template>
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
  </v-tab-item>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Domain {
  @include e(cartesian-gird) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 32px;
  }
}
</style>
