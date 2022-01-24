<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";

export default {
  name: "ChangePasswordPage",
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
          this.$router.push({ name: "signIn" });
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
  <div>
    <p class="font-h-3 brand-purple fw-700">Reset Password</p>
    <form @submit.prevent="submit" @change="changeValues" ref="form">
      <BaseInput label="New Password" type="password" name="password" />
      <p v-if="isPasswordInvalid" class="ChangePassword__error font-12-16">
        {{ passwordValidationMessage }}
      </p>

      <BaseButton
        class="w-1-1 m-t-3 bg-primary ChangePassword--submit"
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
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.ChangePassword {
  @include m(submit) {
    color: $white;
    background-image: $horizental;
    border-radius: 30px;

    ::v-deep .v-btn__content {
      font-size: 13px;
      line-height: 24px;
      font-weight: 700;
    }
  }

  @include e(reset) {
    color: $blue;
  }

  @include e(error) {
    color: $error;
  }
}
</style>