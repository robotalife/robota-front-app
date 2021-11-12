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
      date: "14 Jun, 202",
      projectName: "Immiscible_SPE10T",
      userInfo: "",
      isAdminUser: "",
      fetchedData: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    logout() {
      storage.removeItem("token");
      storage.removeItem("user");
      this.$router.push({ name: "login" });
    },
    showQueue() {
      return this.$emit("clicked", "Queue");
    },
    showProjects() {
      return this.$emit("clicked", "Projects");
    },
    getUserInfo() {
      this.$api.admin.fetchUser(storage.getItem("user").id).then((result) => {
        storage.setItem("user", result);
        this.userInfo = result.firstName + " " + result.lastName;
        this.isAdminUser = result.admin;
        this.fetchedData = true;
      });
    },
    changePassword() {
      return this.$emit("clicked", "Password");
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
            <VIcon color="grey" class="Header__profile" dark>$user</VIcon>
            <span class="m-l-1 font-14-24 g-100 d-flex ai-center">
              {{ userInfo }}
            </span>
          </div>
        </template>
        <v-list>
          <v-list-item @click="changePassword">
            <v-list-item-title>
              <VIcon dark>$lock</VIcon>
              <span class="g-65 font-14-24 fw-500 m-l-1">Change Password</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>
              <VIcon dark>$logout</VIcon>
              <span class="g-65 font-14-24 fw-500 m-l-1">Logout</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="showQueue">
            <v-list-item-title>
              <VIcon dark>$history</VIcon>
              <span class="g-65 font-14-24 fw-500 m-l-1"
                >Simulation History</span
              >
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="showProjects">
            <v-list-item-title>
              <VIcon dark>$saved</VIcon>
              <span class="g-65 font-14-24 fw-500 m-l-1">My Projects</span>
            </v-list-item-title>
          </v-list-item>
          <router-link v-if="isAdminUser" to="/admin/queue">
            <v-list-item>
              <v-list-item-title>
                <VIcon dark>$admin</VIcon>
                <span class="g-65 font-14-24 fw-500 m-l-1">Admin</span>
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
