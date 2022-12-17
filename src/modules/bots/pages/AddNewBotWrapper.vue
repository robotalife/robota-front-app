<script>
import PageTitle from "@/components/title/PageTitle";
export default {
  name: "AddNewBotWrapper",
  components: { PageTitle },
  computed: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<template>
  <div class="w-1-1">
    <div class="AddNewBotWrapper p-x-5 p-y-7 h-1-1">
      <PageTitle text="Add New Bot" />
      <!-- Todo : create a component out of this     -->
      <v-card elevation="0" class="m-t-3 AddNewBotWrapper__tabs">
        <div class="d-flex jc-between">
          <div class="d-flex">
            <RouterLink to="/bots/create" class="d-flex ai-start p-y-3">
              <div class="h-1-1">
                <span
                  class="AddNewBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Add New Bot
                </span>
              </div>
            </RouterLink>
            <RouterLink to="/bots/featured" class="d-flex ai-start p-y-3 m-l-3">
              <div class="h-1-1">
                <span
                  class="AddNewBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Bots
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </v-card>
      <RouterView />
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.AddNewBotWrapper {
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

  .AddNewBotWrapper__tab {
    color: $brand-purple !important;
  }
}
</style>
