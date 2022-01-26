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
        <VIcon dark>$dashboard</VIcon>
      </RouterLink>
      <RouterLink to="/smart-trade/trading-terminal" class="m-t-5">
        <VIcon dark>$smartTrade</VIcon>
      </RouterLink>
      <VIcon dark class="m-t-5">$portfolio</VIcon>
      <RouterLink to="/settings/profile" class="m-t-5">
        <VIcon dark>$setting</VIcon>
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
