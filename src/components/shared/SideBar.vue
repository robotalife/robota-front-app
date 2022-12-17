<script>
import VIcon from "vuetify/lib/components/VIcon";
export default {
  name: "SideBar",
  components: {
    VIcon,
  },
};
</script>

<template>
  <div class="SideBar p-x-4 p-y-6 d-flex flex-col jc-between">
    <div class="d-flex flex-col">
      <RouterLink to="/portfolio">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$portfolio</VIcon>
          </template>
          <span>Portfolio</span>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/bots/mine" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$mybots</VIcon>
          </template>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/bots/store" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$store</VIcon>
          </template>
          <span>Bot Store</span>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/settings/profile" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$setting</VIcon>
          </template>
          <span>Settings</span>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/bots/create" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$addbot</VIcon>
          </template>
          <span>Add New Bot</span>
        </v-tooltip>
      </RouterLink>
    </div>
    <div class="d-flex flex-col">
      <a href="https://www.instagram.com/robotalife/" class="m-t-5">
        <VIcon dark>$instagram</VIcon>
      </a>
      <a href="https://twitter.com/RobotaLife" class="m-t-5">
        <VIcon dark>$twitter</VIcon>
      </a>
      <VIcon dark class="m-t-5">$telegram</VIcon>
      <RouterLink to="/settings/profile" class="m-t-5">
        <VIcon color="grey" class="Header__profile" dark>$user</VIcon>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
.SideBar {
  border-right: 2px solid $gray-10;
  height: 90vh;
}
</style>
