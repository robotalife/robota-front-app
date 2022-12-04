<!--<script>-->
<!--import Tabs from "@/components/tabs/Tabs.vue";-->
<!--import Exchange from "./Exchange.vue";-->
<!--// import storage from "@/utils/storage";-->
<!--export default {-->
<!--  name: "Settings",-->
<!--  components: {-->
<!--    Tabs,-->
<!--    Exchange,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      snackbar: false,-->
<!--      dialog2: false,-->
<!--      errorMessage: "",-->
<!--      snackbarColor: "pink",-->
<!--      projectList: null,-->
<!--      modelTitle: "",-->
<!--      loading: false,-->
<!--      outputProjects: [],-->
<!--      changePasswordDialog: false,-->
<!--      userPassword: {-->
<!--        currentPassword: "",-->
<!--        newPassword: "",-->
<!--      },-->
<!--      tabItems: [-->
<!--        {-->
<!--          title: "Edit Profile",-->
<!--          index: 1,-->
<!--        },-->
<!--        {-->
<!--          title: "Security",-->
<!--          index: 2,-->
<!--        },-->
<!--        {-->
<!--          title: "Notification",-->
<!--          index: 3,-->
<!--        },-->
<!--        {-->
<!--          title: "My Exchanges",-->
<!--          index: 4,-->
<!--        },-->
<!--      ],-->
<!--      tab: 1,-->
<!--    };-->
<!--  },-->
<!--  mounted: function () {},-->
<!--  methods: {},-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div class="h-1-1 w-1-1">-->
<!--    <div class="Setting h-1-1 d-flex flex-col ai-center jc-center">-->
<!--      <Tabs :items="tabItems" />-->
<!--      <v-tabs-items v-model="tab" class="w-1-3">-->
<!--        <Exchange />-->
<!--        <Exchange />-->
<!--        <Exchange />-->
<!--        <Exchange />-->
<!--      </v-tabs-items>-->
<!--    </div>-->
<!--    <v-snackbar v-model="snackbar" :right="true" :multi-line="true">-->
<!--      {{ errorMessage }}-->
<!--      <template v-slot:action="{ attrs }">-->
<!--        <v-btn-->
<!--          :color="snackbarColor"-->
<!--          text-->
<!--          v-bind="attrs"-->
<!--          @click="snackbar = false"-->
<!--        >-->
<!--          close-->
<!--        </v-btn>-->
<!--      </template>-->
<!--    </v-snackbar>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--@import "@/styles/global/color";-->
<!--@import "@/styles/utils/bem";-->
<!--.Setting {-->
<!--  background-color: #f1f2f4;-->
<!--  max-height: 92vh;-->
<!--}-->
<!--</style>-->
