<script>
export default {
  name: "Index",
};
</script>

<template>
  <div class="w-1-1">
    <div class="SettingsWrapper p-x-5 p-y-7 h-1-1">
      <p class="brand-purple font-h-1 fw-700">Bots</p>
      <v-card elevation="0" class="m-t-3 SettingsWrapper__tabs">
        <div class="d-flex jc-between">
          <div class="d-flex">
            <RouterLink to="/bots/market" class="d-flex ai-start p-y-3">
              <div class="h-1-1">
                <span class="SettingsWrapper__tab font-16-24 g-2 fw-500">
                  Market
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </v-card>
      <div class="m-t-5">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.SettingsWrapper {
  overflow-y: scroll;
  height: 90vh;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f7fa;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #bec4cb;
  }

  &::-webkit-scrollbar-track {
    border-radius: 2px;
    //-webkit-box-shadow: inset 0 0 0 1px #fff;
  }

  @include e(tabs) {
    border-bottom: 2px solid $gray-10;
    border-radius: unset;
  }
}

.router-link-active {
  border-bottom: 2px solid rgb(79, 79, 243);

  .SettingsWrapper__tab {
    color: $brand-purple !important;
  }
}
</style>
