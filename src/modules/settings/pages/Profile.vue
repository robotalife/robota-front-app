<script>
import BaseInput from "@/components/input/BaseInput";
import BaseButton from "@/components/button/BaseButton";
import storage from "@/utils/storage";

export default {
  name: "Profile",
  components: { BaseButton, BaseInput },
  computed: {},
  data() {
    return {
      snackbar: false,
      errorMessage: "",
      snackbarColor: "pink",
      userEmail: storage.getItem("user")?.email,
      basicInfo: {
        firstName: "",
        lastName: "",
      },
    };
  },
  mounted() {
    this.$api.exchange.fetchBasicInfo().then((result) => {
      this.basicInfo.firstName = result.firstName;
      this.basicInfo.lastName = result.lastName;
    });
  },
  methods: {
    changeValues(e) {
      const value = e.target.value;
      const name = e.target.name;
      this.basicInfo[name] = value;
    },
    updateProfile(e) {
      e.preventDefault();
      this.$api.exchange
        .updateBasicInfo(this.basicInfo)
        .then(() => {
          this.errorMessage = "Details have been updated.";
          this.snackbar = true;
          this.snackbarColor = "green";
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          this.snackbar = true;
          this.snackbarColor = "red";
        });
    },
  },
};
</script>

<template>
  <div class="d-flex flex-col w-1-4">
    <form @submit.prevent="updateProfile" @change="changeValues">
      <BaseInput
        label="First Name"
        type="text"
        name="firstName"
        :value="basicInfo.firstName"
      />
      <BaseInput
        label="Last Name"
        type="text"
        name="lastName"
        :value="basicInfo.lastName"
      />
      <BaseInput
        label="Email"
        type="email"
        name="email"
        :value="userEmail"
        disabled
      />
      <BaseButton
        text="Submit"
        class="w-1-2 m-t-3 bg-brand-purple Profile__submit"
        size="small"
      />
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
<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Profile {
  @include e(submit) {
    color: $white;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }

    @include e(reset) {
      color: $blue;
    }

    @include e(error) {
      color: $error;
    }
  }
}
</style>
