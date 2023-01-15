<script>
export default {
  name: "BotLogsPage",
  components: {},
  computed: {},
  created() {
    this.$api.bots.getBotLogs(this.$route.params.id).then((response) => {
      console.log("response of bot logs ", response);
      // botId
      //     :
      //     8
      // createdAt
      //     :
      //     "2023-01-14T22:42:30.000+00:00"
      // id
      //     :
      //     1
      // logType
      //     :
      //     "BOT_CREATION"
      // message
      //     :
      //     "Bot has been created."
      this.logs = response;
    });
  },
  data() {
    return {
      headers: [
        {
          text: "Creation Date",
          value: "createdAt",
          width: "20%",
        },
        { text: "Status", value: "message" },
      ],
      logs: [],
    };
  },
  methods: {},
};
</script>
<template>
  <div class="w-1-1">
    <div class="BotLogs h-1-1 m-t-3"></div>
    <v-card class="BotLogs--card">
      <v-card-title>Event Logs</v-card-title>
      <v-data-table
        :headers="headers"
        :items="logs"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.createdAt="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p class="fw-500 font-text-sm gray-900">
                {{ new Date(item.createdAt).toDateString() }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{ new Date(item.createdAt).toLocaleTimeString() }}
              </p>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";
th {
  background: gray;
}
.BotLogs {
  @include e(card) {
    border: 2px solid $gray-10;
    box-sizing: border-box;
    border-radius: 8px;
    max-width: 425px;
  }
}
</style>
