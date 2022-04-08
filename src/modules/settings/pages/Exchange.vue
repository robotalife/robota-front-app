<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseSelect from "@/components/select/BaseSelect.vue";
import storage from "@/utils/storage";
import { constants } from "@/constant/constants";

export default {
  name: "Exchange",
  components: {
    BaseInput,
    BaseButton,
    BaseSelect,
  },
  computed: {
    valuesItem() {
      return [
        {
          label: "Account Label",
          name: "exchangeName",
        },
        {
          label: "API key",
          name: "apiKey",
        },
        {
          label: "Secret Key",
          name: "apiSecret",
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
        passPhrase: "",
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
      exchangeTypeList: [
        { text: "Binance", value: "BINANCE" },
        { text: "KuCoin", value: "KUCOIN" },
      ],
      passphrase: "",
      selectedExchangeType: "BINANCE",
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
      this.$api.exchange
        .addExchange(this.exchangeObj)
        .then((result) => {
          if (!this.userData[this.exchangeListKey]) {
            this.userData[this.exchangeListKey] = [];
          }
          this.userData[this.exchangeListKey].push(result);
          this.exchangeList.push(result);
          storage.setItem("exchanges", this.userData);
          this.addExchangeDialog = false;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
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
    changeExchangeType(selectedExchange) {
      this.selectedExchangeType = selectedExchange;
      this.exchangeObj.exchangeType = selectedExchange;
    },
  },
};
</script>

<template>
  <div class="Exchange__cartesian-grid w-1-2">
    <v-card
      v-for="(exchange, index) in exchangeList"
      :key="index"
      elevation="0"
      class="Exchange__card p-3"
      outlined
    >
      <div class="d-flex jc-between">
        <p class="gray-2 font-body fw-700">{{ exchange.exchangeName }}</p>
        <!--        <p class="gray-2 font-body fw-400">$ UST</p>-->
      </div>
      <div
        v-if="exchangeList.length"
        class="d-flex jc-end m-t-5"
        @click="() => openDeleteConfirmationDialog(exchange)"
      >
        <BaseButton
          beforeIcon="$trash"
          class="Exchange__delete"
          text="Delete"
        />
      </div>
    </v-card>
    <!--      <p class="m-r-1">-->
    <!--        {{ exchange.exchangeName }}-->
    <!--      </p>-->
    <div
      class="Exchange__add-exchange d-flex ai-center jc-center"
      @click="addExchangeDialog = true"
    >
      <BaseButton
        class="bg-brand-purple Exchange__add-btn"
        text="Add Exchange"
      />
    </div>

    <v-dialog v-model="addExchangeDialog" width="550" height="600">
      <div class="p-2 bg-white">
        <p class="gray-2 font-h-2 fw-700">Connect your Binance Account</p>
        <p class="gray-2 font-body fw-400 m-t-1">
          At this moment you just can add binance account. A secure connection
          with your exchange account is established using API keys. To learn
          more about how API keys work, click here.
        </p>
        <p class="gray-2 m-t-3 font-text-one fw-700">
          Enter your API Key for Binance
        </p>
        <form
          class="m-t-3 bg-white"
          @submit.prevent="addExchange"
          @change="changeExchangeForm"
        >
          <BaseSelect
            label="Exchange Type"
            :items="exchangeTypeList"
            name="exchangeType"
            :selected="exchangeTypeList[0].text"
            class="Exchange__exchange-type m-r-2"
            @changed="changeExchangeType"
          />
          <BaseInput
            v-for="item in valuesItem"
            :key="item.name"
            :label="item.label"
            :name="item.name"
            v-model="inputValues[item.name]"
          />
          <BaseInput
            v-if="selectedExchangeType === 'KUCOIN'"
            label="Passphrase"
            name="passPhrase"
            v-model="passphrase"
          />
          <BaseButton
            text="Add Exchange"
            class="w-1-1 Exchange__dialog-submit m-t-2"
          />
        </form>
      </div>
    </v-dialog>
    <v-dialog v-model="deleteConfirmation" width="406" height="424">
      <div class="p-5 bg-white">
        <p class="ta-center gray-2 font-h-2 fw-700">Are you sure to delete ?</p>
        <p class="ta-center gray-2 font-body fw-400 m-t-2">
          This account and all associated data will be removed.
        </p>
        <div class="d-flex jc-between m-t-7">
          <div @click="closeDialog">
            <BaseButton text="Cancel" class="Exchange__delete m-t-2" />
          </div>
          <div @click="deleteExchange">
            <BaseButton
              text="Confirm Delete"
              class="Exchange__confirm-btn m-t-2"
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

.Exchange {
  @include e(cartesian-grid) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 24px;
  }

  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    min-width: 312px;
  }

  @include e(add-exchange) {
    background: $gray-10;
    border-radius: 8px;
    min-height: 152px;
    min-width: 312px;
  }

  @include e(add-btn) {
    color: $white;
    border-radius: 16px;

    ::v-deep .v-btn__content {
      font-size: 12px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(dialog-submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(delete) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 30px;
    color: $gray-6;
    font-weight: 400;
    font-size: 12px;
    line-height: 24px;
    background-color: white !important;
    padding: 0 22px;

    ::v-deep .v-icon__component,
    .v-icon__svg {
      height: 12px !important;
      width: 12px !important;
    }
  }

  @include e(confirm-btn) {
    border: 2px solid $red;
    background: white !important;
    color: $red;
    font-size: 12px;
    line-height: 24px;
    border-radius: 30px;
  }

  @include e(exchange-type) {
    .v-text-field__details {
      display: none;
    }
  }
}
</style>
