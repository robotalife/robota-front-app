<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import storage from "@/utils/storage";
export default {
  name: "Exchange",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      valuesItem: [
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
      ],
      exchangeObj: {
        apiKey: "",
        apiSecret: "",
        exchangeName: "",
        exchangeType: "BINANCE",
        userId: storage.getItem("user").id,
      },
      exChangeList: this.$store.state.exChangeList,
      addExchangeDialog: false,
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
    };
  },
  created() {
    console.log(this.$store.state.exChangeList, "exchange list");
  },
  methods: {
    changeExchangeForm(e) {
      const name = e.target.name;
      const value = e.target.value;
      this.exchangeObj[name] = value;
    },
    addExchange() {
      console.log(this.exchangeObj);
      this.$api.exchange.addExchange(this.exchangeObj).then((result) => {
        console.log(result, this.$store.state.exChangeList, "2");
        this.$store.commit("ADD_EXCHANGE", result);
        this.addExchangeDialog = false;
      });
    },
    deleteExchange(id) {
      this.$api.exchange.deleteExchange(id).then(() => {
        this.exChangeList.map((item, index) => {
          if (item.exchangeId === id) {
            let list = this.exChangeList;
            list.splice(index, 1);
            this.$store.commit("SET_EXCHANGE_LIST", list);
          }
        });
      });
    },
  },
};
</script>

<template>
  <v-tab-item :transition="false" class="p-4 w-1-1">
    <div
      v-for="(exchange, index) in exChangeList"
      :key="index"
      class="d-flex ai-center"
    >
      <p class="m-r-1">
        {{ exchange.exchangeName }}
      </p>
      <div
        v-if="exChangeList.length"
        @click="() => deleteExchange(exchange.exchangeId)"
      >
        <BaseButton text="Delete Exchange" class="m-t-2" />
      </div>
    </div>
    <div @click="addExchangeDialog = true">
      <BaseButton text="Add Exchange" class="m-t-2" />
    </div>
    <v-dialog v-model="addExchangeDialog" width="550" height="600">
      <form class="m-t-4 p-2 bg-white" @change="changeExchangeForm">
        <BaseInput
          v-for="item in valuesItem"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        />
        <div @click.prevent="addExchange">
          <BaseButton
            text="Add Exchange"
            class="m-t-2"
            @click.prevent="addExchange"
          />
        </div>
      </form>
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
