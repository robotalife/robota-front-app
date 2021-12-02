<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default {
  name: "ForgetPasswordFinish",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      password: "",
      isPasswordInvalid: true,
      passwordValidationMessage: "",
      resetKey: "",
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
    };
  },
  methods: {
    validatePassword(value) {
      let passwordPattern = new RegExp(
        "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
      );
      if (value === "") {
        this.isPasswordInvalid = true;
        this.passwordValidationMessage = "password is required";
        return false;
      } else if (passwordPattern.test(value)) {
        this.password = value;
        this.isPasswordInvalid = false;
        this.passwordValidationMessage = "";
        return true;
      } else {
        this.isPasswordInvalid = true;
        this.passwordValidationMessage =
          "password must have at least eight characters, at least one uppercase letter," +
          " one lowercase letter, one number and one special character.";
        return false;
      }
    },
    submit() {
      this.resetkey = this.$route.query.key;
      if (!this.validatePassword(this.password)) {
        return;
      }
      this.$api.auth
        .finishResetPassword(this.password, this.$route.query.key)
        .then(() => {
          this.errorMessage = `Password has been changed.`;
          this.snackbarColor = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          console.log(error, "er");
          this.snackbar = true;
          this.errorMessage = error?.response?.data.message;
        });
    },
    changeValues(e) {
      const value = e.target.value;
      this.validatePassword(value);
    },
  },
};
</script>
<template>
  <form @submit.prevent="submit" @change="changeValues" ref="form">
    <p class="m-t-5 g-100 font-29-48 fw-900 m-b-0">Reset Password</p>
    <BaseInput label="New Password" type="password" name="password" />
    <p v-if="isPasswordInvalid" class="ForgetPassword__error font-12-16">
      {{ passwordValidationMessage }}
    </p>

    <BaseButton
      class="w-1-1 m-t-3 bg-primary ForgetPassword__submit"
      text="Change Password"
      size="small"
    />
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
  </form>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.ForgetPassword {
  @include e(submit) {
    color: $white;
  }

  @include e(error) {
    color: $error;
  }
}
</style>
