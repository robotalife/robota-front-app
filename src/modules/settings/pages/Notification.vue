<script>
import VSwitch from "vuetify/lib/components/VSwitch";
export default {
  name: "Notification",
  components: { VSwitch },
  computed: {},
  data() {
    return {
      isEmailOn: true,
      isBrowserOn: true,
      isTelegramBotOn: true,
      isNewsletterOn: true,
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
    };
  },
  methods: {},
};
</script>

<template>
  <div class="d-flex flex-col w-1-4">
    <form>
      <VSwitch inset color="indigo" v-model="isEmailOn" label="Email"></VSwitch>
      <VSwitch
        inset
        color="indigo"
        v-model="isBrowserOn"
        label="Browser Alert"
      ></VSwitch>
      <VSwitch
        inset
        color="indigo"
        v-model="isTelegramBotOn"
        label="Telegram Bot"
      ></VSwitch>
      <VSwitch
        inset
        color="indigo"
        v-model="isNewsletterOn"
        label="Newsletter"
      ></VSwitch>
    </form>
    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbarColor"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<style scoped lang="scss"></style>
