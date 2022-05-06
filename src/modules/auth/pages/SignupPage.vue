<script>
import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/button/BaseButton.vue";
export default {
  name: "SignUp",
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      emailAddress: "",
      userPassword: "",
      rpPassword: "",
      errorMessage: "",
      snackbarColor: "pink",
      snackbar: false,
      emailRules: this.$rules.email,
      emailIsNotValid: false,
      passwordIsNotValid: false,
      emailValidation: "",
      passwordValidation: "",
      termsAndConditions: false,
    };
  },
  methods: {
    submit() {
      console.log(this.emailAddress, this.userPassword, this.rpPassword);
      this.$api.auth
        .registerUser(this.emailAddress, this.userPassword)
        .then(() => {
          this.snackbar = true;
          this.snackbarColor = "green";
          this.errorMessage =
            "Please check your email for the activation email.";
          setTimeout(() => this.$router.push({ name: "signIn" }), 15000);
        })
        .catch((error) => {
          this.snackbar = true;
          this.errorMessage = error?.response?.data.message;
        });
    },
    changeValues(e) {
      const value = e.target.value;
      const name = e.target.name;
      const emailRegex = new RegExp(/.+@.+\..+/);
      if (name === "email") {
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
      } else if (name === "password") {
        if (value === "") {
          this.passwordIsNotValid = true;
          this.passwordValidation = "password is required";
        } else {
          this.userPassword = value;
          this.passwordIsNotValid = false;
        }
      } else {
        if (value === "") {
          this.passwordIsNotValid = true;
          this.passwordValidation = "password is required";
        } else if (value !== this.userPassword) {
          this.passwordIsNotValid = true;
          this.passwordValidation = "passwords are not matched";
        } else {
          this.rpPassword = value;
          this.passwordIsNotValid = false;
        }
      }
    },
  },
};
</script>
<template>
  <div>
    <p class="font-h-3 brand-purple fw-700">Sign Up</p>
    <form class="m-t-3" @submit.prevent="submit" @change="changeValues">
      <BaseInput label="Email" type="email" name="email" />
      <p v-if="emailIsNotValid" class="SignUp__error font-12-16">
        {{ emailValidation }}
      </p>
      <div class="m-t-2">
        <BaseInput label="Password" type="password" name="password" />
        <p v-if="passwordIsNotValid" class="SignUp__error font-12-16">
          {{ passwordValidation }}
        </p>
      </div>
      <div class="m-t-2">
        <BaseInput label="Reapet Password" type="password" name="rp-password" />
        <p v-if="passwordIsNotValid" class="SignUp__error font-12-16">
          {{ passwordValidation }}
        </p>
      </div>

      <label class="d-flex ai-center m-t-3">
        <input type="checkbox" value="termsAndConditions" />
        <p class="m-l-0-5 font-text-small">
          I agree to the <a href="#" class="SignUp__link">Term & Conditions</a>
        </p>
      </label>

      <BaseButton
        class="w-1-1 m-t-3 SignUp__submit"
        text="Sign Up"
        size="small"
      />
      <div class="d-flex m-t-5 jc-center fw-500">
        <p class="font-14-24 g-65 m-r-0-5">
          Already have an account?
          <RouterLink to="/login" class="SignUp__reset"> Sign In </RouterLink>
        </p>
      </div>
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

.SignUp {
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

  @include e(link) {
    color: $blue;
  }
}
</style>
