<script>
import PageTitle from "@/components/title/PageTitle";

export default {
  name: "SingleBotWrapper",
  components: { PageTitle },
  computed: {},
  data() {
    return {
      pageTitle: "Overview",
      bot: {},
    };
  },
  created() {
    this.pageTitle = this.$route.name;

    this.$api.bots.getBot(this.$route.params.id).then((result) => {
      this.bot = result;
    });
  },
  methods: {},
};
</script>
<template>
  <div class="SingleBotWrapper w-1-1 p-x-5 p-y-7 h-1-1">
    <PageTitle :text="pageTitle"></PageTitle>
    <div
      class="d-flex jc-between"
      style="
        gap: 24px;
        width: 100%;
        height: 92px;
        align-items: center;
        background: #f9f5ff;
        border-radius: 8px;
      "
    >
      <div class="d-flex flex-col m-l-2">
        <p class="primary-500 fw-500 font-text-sm">Name</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.name }}</p>
      </div>
      <div class="d-flex flex-col">
        <p class="primary-500 fw-500 font-text-sm">Price</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.price }}</p>
      </div>
      <div class="d-flex flex-col">
        <p class="primary-500 fw-500 font-text-sm">Exchange</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.exchangeType }}</p>
      </div>
      <div class="d-flex flex-col">
        <p class="primary-500 fw-500 font-text-sm">Pair</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.pair }}</p>
      </div>
      <div class="d-flex flex-col">
        <p class="primary-500 fw-500 font-text-sm">Strategy</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.strategy }}</p>
      </div>
      <div class="d-flex flex-col">
        <p class="primary-500 fw-500 font-text-sm">Created By</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.createdBy }}</p>
      </div>
      <div class="d-flex flex-col m-r-2">
        <p class="fw-500 font-text-sm" style="color: #9e77ed">Started At</p>
        <p class="primary-700 font-16-24 fw-500">{{ bot.createdAt }}</p>
      </div>
    </div>
    <div>
      <v-card elevation="0" class="m-t-3 SingleBotWrapper__tabs">
        <div class="d-flex jc-between">
          <div class="d-flex">
            <RouterLink
              :to="{ path: '/bots/' + $route.params.id + '/overview' }"
              class="d-flex ai-start p-y-3"
            >
              <div class="h-1-1">
                <span
                  class="SingleBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Overview
                </span>
              </div>
            </RouterLink>
            <RouterLink
              :to="{ path: '/bots/' + $route.params.id + '/active-trades' }"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span
                  class="SingleBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Active Trades
                </span>
              </div>
            </RouterLink>
            <RouterLink
              :to="{
                path: '/bots/bot/' + $route.params.id + '/trades-history',
              }"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span
                  class="SingleBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Trades History
                </span>
              </div>
            </RouterLink>
            <RouterLink
              :to="{ path: '/bots/' + $route.params.id + '/logs' }"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span
                  class="SingleBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Log
                </span>
              </div>
            </RouterLink>
            <RouterLink
              :to="{ path: '/bots/' + $route.params.id + '/tokens' }"
              class="d-flex ai-start p-y-3 m-l-3"
            >
              <div class="h-1-1">
                <span
                  class="SingleBotWrapper__tab gray-500 font-text-sm g-2 fw-500"
                >
                  Tv Tokens
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </v-card>
    </div>
    <router-view />
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.SingleBotWrapper {
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

  .SingleBotWrapper__tab {
    color: $brand-purple !important;
  }
}
</style>
