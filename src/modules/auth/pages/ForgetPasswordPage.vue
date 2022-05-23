<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  name: "ForgetPassword",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      emailAddress: "",
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
      emailRules: this.$rules.email,
      emailIsNotValid: false,
      emailValidation: "",
      isButtonLoading: false,
    };
  },
  methods: {
    submit() {
      this.isButtonLoading = true;
      this.$api.auth
        .initiateResetPassword(this.emailAddress)
        .then(() => {
          this.isButtonLoading = false;
          this.errorMessage = `Rest Password link, sent to ${this.emailAddress}`;
          this.snackbarColor = "green";
          this.snackbar = true;
        })
        .catch((error) => {
          this.isButtonLoading = false;
          this.snackbar = true;
          this.snackbarColor = "red";
          this.errorMessage = error?.response?.data.message;
        });
    },
    changeValues(e) {
      const value = e.target.value;
      const emailRegex = new RegExp(/.+@.+\..+/);
      if (value === "") {
        this.emailIsNotValid = true;
        this.emailValidation = "email is required";
      } else if (emailRegex.test(value)) {
        this.emailAddress = value;
        this.emailIsNotValid = false;
      } else {
        this.emailIsNotValid = true;
        this.emailValidation = "email is not valid";
      }
    },
  },
};
</script>
<template>
  <div>
    <p class="font-h-3 brand-purple fw-700">Reset Password</p>
    <form @submit.prevent="submit" @change="changeValues">
      <BaseInput label="Email" type="email" name="email" />
      <p v-if="emailIsNotValid" class="ForgetPassword__error font-12-16">
        {{ emailValidation }}
      </p>

      <BaseButton
        class="w-1-1 m-t-3 ForgetPassword__submit"
        text="Reset Password"
        size="small"
        :isLoading="isButtonLoading"
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

.ForgetPassword {
  @include e(submit) {
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
