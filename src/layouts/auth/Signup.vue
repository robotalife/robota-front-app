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
      emailRules: this.$validate.emailRules,
      emailIsNotValid: false,
      passwordIsNotValid: false,
      emailValidation: "",
      passwordValidation: "",
    };
  },
  methods: {
    submit() {
      console.log(this.emailAddress, this.userPassword, this.rpPassword);
      this.$api.auth
        // .loginUser('admin@kariztech.com', '12345678')
        .registerUser(this.emailAddress, this.userPassword)
        .then(() => {
          this.$router.push({ name: "login" });
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
  <form @submit.prevent="submit" @change="changeValues">
    <p class="m-t-5 g-100 font-29-48 fw-900 m-b-0">Welcome Back</p>
    <p class="g-65 font-14-24 fw-500 m-b-5">
      Please login to access your dashboard
    </p>
    <BaseInput label="Email" type="email" name="email" />
    <p v-if="emailIsNotValid" class="Login__error font-12-16">
      {{ emailValidation }}
    </p>
    <div class="m-t-2">
      <BaseInput label="Password" type="password" name="password" />
      <p v-if="passwordIsNotValid" class="Login__error font-12-16">
        {{ passwordValidation }}
      </p>
    </div>
    <div class="m-t-2">
      <BaseInput label="Reapet Password" type="password" name="rp-password" />
      <p v-if="passwordIsNotValid" class="Login__error font-12-16">
        {{ passwordValidation }}
      </p>
    </div>

    <BaseButton
      class="w-1-1 m-t-3 bg-primary Login--submit"
      text="Sign Up"
      size="small"
    />
    <div class="d-flex m-t-5 jc-center fw-500">
      <p class="font-14-24 g-65 m-r-0-5">
        Already have an account?
        <RouterLink to="/login" class="Login__reset"> Sign In </RouterLink>
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
</template>

<style scoped lang="scss">
@import "@/styles/global/color";
@import "@/styles/utils/bem";

.Login {
  @include m(submit) {
    color: $white;
  }

  @include e(reset) {
    color: $primary-blue-100;
  }

  @include e(error) {
    color: $error;
  }
}
</style>
