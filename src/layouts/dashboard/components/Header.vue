<script>
import VIcon from "vuetify/lib/components/VIcon";
import storage from "@/utils/storage";
export default {
  name: "Header",
  components: {
    VIcon,
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
  data() {
    return {
      userInfo: storage.getItem("userId").email,
      isAdminUser: "",
      fetchedData: true,
    };
  },
  created() {
    // this.getUserExchanges();
  },
  methods: {
    logout() {
      storage.removeItem("token");
      storage.removeItem("userId");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<template>
  <v-card :loading="!fetchedData" elevation="0">
    <div class="d-flex jc-between ai-center Header p-x-4 p-y-2 bg-white">
      <div class="d-flex ai-center">
        <VIcon class="Header--darsim" size="32" dark>$darsim</VIcon>
        <span class="g-100 font-18-24 fw-500 m-l-1">Darsim</span>
      </div>
      <v-menu
        v-if="fetchedData"
        rounded="lg"
        offset-y
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <div class="d-flex" v-bind="attrs" v-on="on">
            <span class="m-r-1 font-14-24 g-100 d-flex ai-center">
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
          <router-link to="/exchange">
            <v-list-item>
              <v-list-item-title>
                <!-- <VIcon dark>$admin</VIcon> -->
                <span class="g-65 font-14-24 fw-500 m-l-1">My Exchanges</span>
              </v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
      <!-- <router-link to="/admin/queue">
      <div class="d-flex">Admin</div>
    </router-link> -->
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
}
</style>
