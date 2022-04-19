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
      <RouterLink to="/dashboard">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$dashboard</VIcon>
          </template>
          <span>Dashboard</span>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/smart-trade/trading-terminal" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$smartTrade</VIcon>
          </template>
          <span>Trading Terminal</span>
        </v-tooltip>
      </RouterLink>
      <RouterLink to="/portfolio" class="m-t-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <VIcon v-bind="attrs" v-on="on">$portfolio</VIcon>
          </template>
          <span>Portfolio</span>
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
    </div>
    <div class="d-flex flex-col">
      <a href="https://www.instagram.com/robotalife/" class="m-t-5">
        <VIcon dark>$instagram</VIcon>
      </a>
      <a href="https://twitter.com/RobotaLife" class="m-t-5">
        <VIcon dark>$twitter</VIcon>
      </a>
      <VIcon dark class="m-t-5">$telegram</VIcon>
      <RouterLink to="/settings" class="m-t-5">
        <VIcon dark>$robota</VIcon>
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
