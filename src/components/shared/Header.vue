<script>
import VIcon from "vuetify/lib/components/VIcon";
import BaseSelect from "@/components/select/BaseSelect.vue";
import storage from "@/utils/storage";
export default {
  name: "Header",
  components: {
    VIcon,
    BaseSelect,
  },
  props: {
    name: {
      type: String,
      default: "",
    },
    label: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.fetchExchangeList();
  },
  data() {
    return {
      userInfo: storage.getItem("user")?.email,
      exchangeList: [],
      isLoading: false,
      selectedExchange: [
        {
          exchangeName: "Create an exchange",
          exchangeId: "",
        },
      ],
    };
  },
  methods: {
    logout() {
      storage.removeItem("token");
      storage.removeItem("user");
      this.$router.push({ name: "signIn" });
    },
    fetchExchangeList() {
      this.isLoading = true;
      this.$store.commit("SET_EXCHANGE_LIST_REQUEST_STATUS", "pending");
      this.$api.exchange
        .fetchExchangeList(this.$store.state.user?.id)
        .then((result) => {
          const exchanges = result.exchanges;
          this.$store.commit("SET_EXCHANGE_LIST", exchanges);
          this.$store.commit("SET_EXCHANGE_LIST_REQUEST_STATUS", "success");
          this.exchangeList = this.$store.getters.exchangeListItem;
          this.selectedExchange = exchanges.filter(
            (item) => item.exchangeId === this.$store.getters.selectedExchange
          );
          this.isLoading = false;
          //if the list is empty then the drop down should not be shown
          if (this.selectedExchange.length === 0) {
            this.$store.commit("SET_EXCHANGE_LIST_REQUEST_STATUS", "failed");
            const defaultExchangeValue = {
              exchangeName: "Create an exchange",
              exchangeId: "",
            };
            this.selectedExchange.push(defaultExchangeValue);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.logout();
          } else {
            this.snackbar = true;
            this.errorMessage = error.response.data.message;
          }
          this.$store.commit("SET_EXCHANGE_LIST_REQUEST_STATUS", "failed");
          this.isLoading = false;
        });
    },
    changeExchange(value) {
      this.$store.commit("SET_SELECTED_EXCHANGE", value);
      location.reload();
    },
  },
};
</script>
<template>
  <v-card elevation="0" :loading="isLoading">
    <div class="d-flex jc-between ai-center Header p-x-4 p-y-2 bg-white">
      <RouterLink to="/" class="d-flex ai-center Header__logo">
        <VIcon dark>$robotaLogo</VIcon>
      </RouterLink>
      <div class="d-flex ai-center">
        <BaseSelect
          :items="exchangeList"
          name="exchange"
          :selected="selectedExchange[0].exchangeName"
          class="Header__exchange m-r-2"
          @changed="changeExchange"
        />
        <v-menu rounded="lg" offset-y transition="scale-transition">
          <template v-slot:activator="{ attrs, on }">
            <div class="d-flex" v-bind="attrs" v-on="on">
              <span class="m-r-2 font-14-24 g-100 d-flex ai-center">
                {{ userInfo }}
              </span>
              <VIcon color="grey" class="Header__profile" dark>$user</VIcon>
            </div>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>
                <!-- <VIcon dark>$logout</VIcon> -->
                <span class="g-65 font-14-24 fw-500 m-l-1">Logout</span>
              </v-list-item-title>
            </v-list-item>
            <router-link to="/settings/exchange">
              <v-list-item>
                <v-list-item-title>
                  <!-- <VIcon dark>$admin</VIcon> -->
                  <span class="g-65 font-14-24 fw-500 m-l-1">My Exchanges</span>
                </v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Header {
  box-shadow: inset 0 -1px 0 0 $dark-blue-10;

  @include e(profile) {
    background-color: $gray-65;
    width: 32px;
    height: 32px;
    padding: 2px 0px 0px 6px;
    border-radius: 18px;

    > svg > path {
      fill: white;
    }
  }

  @include e(logo) {
    ::v-deep .v-icon__component {
      width: 185px !important;
      height: 42px !important;
    }
  }

  @include e(exchange) {
    max-height: 40px;
  }
}
</style>
