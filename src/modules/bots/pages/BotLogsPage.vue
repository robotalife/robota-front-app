<script>
export default {
  name: "BotLogsPage",
  components: {},
  computed: {},
  created() {
    this.$api.bots.getBotLogs(this.$route.params.id).then((response) => {
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
        :items-per-page="15"
        class="elevation-1"
      >
        <template v-slot:item.createdAt="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3">
              <p class="fw-500 font-text-sm gray-900">
                {{
                  item.createdAt ? new Date(item.createdAt).toDateString() : ""
                }}
              </p>
              <p class="mt-1 fw-500 font-text-sm gray-500">
                {{
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleTimeString()
                    : ""
                }}
              </p>
            </div>
          </div>
        </template>
        <template v-slot:item.message="{ item }">
          <div class="d-flex ai-center py-7">
            <div class="ml-3 BotLogs__badge-log">
              <p
                class="fw-500 font-text-sm gray-700"
                style="mix-blend-mode: multiply"
              >
                {{ item.message }}
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

  @include e(badge-log) {
    background: $gray-100;
    border-radius: 16px;
    padding: 2px 8px;
  }
}
</style>
